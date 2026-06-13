import type { UserRole } from "@/types";

/** Actions that require an authenticated account (not visitor). */
export type ProtectedAction =
  | "create_post"
  | "reply"
  | "vote"
  | "like"
  | "bookmark"
  | "join_group"
  | "download_resource"
  | "send_message"
  | "join_voice"
  | "upload_resource"
  | "create_group"
  | "talent_offer";

export type PermissionKey =
  | "post"
  | "reply"
  | "joinGroup"
  | "uploadResource"
  | "createGroup"
  | "createAssignment"
  | "talentOffer"
  | "vote"
  | "bookmark"
  | "like"
  | "download"
  | "message"
  | "voice";

export const ACTION_TO_PERMISSION: Record<ProtectedAction, PermissionKey> = {
  create_post: "post",
  reply: "reply",
  vote: "vote",
  like: "like",
  bookmark: "bookmark",
  join_group: "joinGroup",
  download_resource: "download",
  send_message: "message",
  join_voice: "voice",
  upload_resource: "uploadResource",
  create_group: "createGroup",
  talent_offer: "talentOffer",
};

export const PERMISSIONS: Record<
  UserRole,
  Record<PermissionKey, boolean>
> = {
  spectator: {
    post: false,
    reply: false,
    joinGroup: false,
    uploadResource: false,
    createGroup: false,
    createAssignment: false,
    talentOffer: false,
    vote: false,
    bookmark: false,
    like: false,
    download: false,
    message: false,
    voice: false,
  },
  participant: {
    post: true,
    reply: true,
    joinGroup: true,
    uploadResource: true,
    createGroup: false,
    createAssignment: false,
    talentOffer: false,
    vote: true,
    bookmark: true,
    like: true,
    download: true,
    message: true,
    voice: true,
  },
  creator: {
    post: true,
    reply: true,
    joinGroup: true,
    uploadResource: true,
    createGroup: true,
    createAssignment: true,
    talentOffer: true,
    vote: true,
    bookmark: true,
    like: true,
    download: true,
    message: true,
    voice: true,
  },
  moderator: {
    post: true,
    reply: true,
    joinGroup: true,
    uploadResource: true,
    createGroup: true,
    createAssignment: true,
    talentOffer: true,
    vote: true,
    bookmark: true,
    like: true,
    download: true,
    message: true,
    voice: true,
  },
  admin: {
    post: true,
    reply: true,
    joinGroup: true,
    uploadResource: true,
    createGroup: true,
    createAssignment: true,
    talentOffer: true,
    vote: true,
    bookmark: true,
    like: true,
    download: true,
    message: true,
    voice: true,
  },
};

export function roleFromProfile(
  role?: UserRole,
  flags?: { isModerator?: boolean; isAdmin?: boolean }
): UserRole {
  if (flags?.isAdmin) return "admin";
  if (flags?.isModerator) return "moderator";
  return role ?? "participant";
}
