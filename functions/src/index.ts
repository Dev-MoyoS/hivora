import * as admin from "firebase-admin";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";

admin.initializeApp();
const db = admin.firestore();

export const onVoteCreated = onDocumentCreated("votes/{voteId}", async (event) => {
  const data = event.data?.data();
  if (!data?.postId || !data?.voteType) return;
  const postRef = db.collection("posts").doc(data.postId);
  const field = data.voteType === "up" ? "upvotes" : "likes";
  await postRef.update({ [field]: admin.firestore.FieldValue.increment(1) });
});

export const onDifficultyVote = onDocumentCreated("votes/{voteId}", async (event) => {
  const data = event.data?.data();
  if (!data?.postId || !["understand", "struggling", "stuck"].includes(data.voteType)) return;
  await db.collection("posts").doc(data.postId).update({
    [`difficultyVotes.${data.voteType}`]: admin.firestore.FieldValue.increment(1),
  });
});

export const generateAnonymousCode = onCall(async () => {
  const prefixes = ["UBUN", "SAFE", "HEAR", "CONF"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]!;
  const code = `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
  return { code };
});

export const cleanupExpiredChats = onSchedule("every 6 hours", async () => {
  const cutoff = admin.firestore.Timestamp.fromDate(new Date(Date.now() - 86400000));
  const groups = await db.collection("study_groups").where("endsAt", "<", cutoff).limit(50).get();
  const batch = db.batch();
  for (const g of groups.docs) {
    const chats = await db.collection("group_chats").where("groupId", "==", g.id).get();
    chats.docs.forEach((c) => batch.delete(c.ref));
  }
  await batch.commit();
  logger.info(`Cleaned chats for ${groups.size} groups`);
});

export const aggregateCampusPulse = onSchedule("every 24 hours", async () => {
  const today = new Date().toISOString().slice(0, 10);
  const posts = await db.collection("posts").orderBy("createdAt", "desc").limit(500).get();
  const counts: Record<string, number> = {};
  posts.docs.forEach((d) => {
    const m = d.data().moduleTag as string;
    if (m) counts[m] = (counts[m] || 0) + 1;
  });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  if (top) {
    await db.collection("analytics").add({
      category: "most_difficult_module",
      count: top[1],
      date: today,
      label: top[0],
    });
  }
});

export const closeInactiveVoiceRooms = onSchedule("every 30 minutes", async () => {
  const cutoff = admin.firestore.Timestamp.fromDate(new Date(Date.now() - 3600000));
  const rooms = await db.collection("voice_rooms").where("lastActive", "<", cutoff).get();
  const batch = db.batch();
  rooms.docs.forEach((r) => batch.update(r.ref, { active: false, participants: [] }));
  await batch.commit();
});

export const onReplyCreated = onDocumentCreated("replies/{replyId}", async (event) => {
  const reply = event.data?.data();
  if (!reply?.postId) return;
  const postRef = db.collection("posts").doc(reply.postId);
  const post = await postRef.get();
  const authorId = post.data()?.authorId;
  if (authorId && authorId !== reply.authorId) {
    await db.collection("notifications").add({
      recipientId: authorId,
      type: "new_reply",
      postId: reply.postId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }
  await postRef.update({ replies: admin.firestore.FieldValue.increment(1) });
});

export const checkPostRateLimit = onCall(async (request) => {
  if (!request.auth) throw new HttpsError("unauthenticated", "Sign in required");
  const hourAgo = admin.firestore.Timestamp.fromDate(new Date(Date.now() - 3600000));
  const recent = await db
    .collection("posts")
    .where("authorId", "==", request.auth.uid)
    .where("createdAt", ">", hourAgo)
    .get();
  if (recent.size >= 10) throw new HttpsError("resource-exhausted", "Rate limit exceeded");
  return { allowed: true };
});
