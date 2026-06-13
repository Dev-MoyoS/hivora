import { readFileSync } from "fs";
import { GoogleAuth } from "google-auth-library";

function loadEnvLocal() {
  const raw = readFileSync(".env.local", "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx);
    let value = trimmed.slice(idx + 1);
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

loadEnvLocal();

const projectId = process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !privateKey || !process.env.FIREBASE_CLIENT_EMAIL) {
  console.error("Missing admin credentials in .env.local");
  process.exit(1);
}

const auth = new GoogleAuth({
  credentials: {
    type: "service_account",
    project_id: projectId,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: privateKey,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
  },
  scopes: ["https://www.googleapis.com/auth/firebase.readonly"],
});

const client = await auth.getClient();
const appsRes = await client.request({
  url: `https://firebase.googleapis.com/v1beta1/projects/${projectId}/webApps`,
});
const apps = appsRes.data.apps ?? [];

if (apps.length === 0) {
  console.log("NO_WEB_APPS");
  process.exit(0);
}

for (const app of apps) {
  const configRes = await client.request({
    url: `https://firebase.googleapis.com/v1beta1/projects/${projectId}/webApps/${app.appId}/config`,
  });
  console.log(JSON.stringify({ displayName: app.displayName, appId: app.appId, ...configRes.data }, null, 2));
}
