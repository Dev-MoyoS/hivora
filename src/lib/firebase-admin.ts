import { initializeApp, getApps, cert, applicationDefault, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";

function buildServiceAccount() {
  const projectId =
    process.env.FIREBASE_PROJECT_ID ??
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (projectId && clientEmail && privateKey) {
    return {
      projectId,
      clientEmail,
      privateKey,
      privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
      clientId: process.env.FIREBASE_CLIENT_ID,
    };
  }

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccountJson) return null;

  try {
    return JSON.parse(serviceAccountJson) as {
      project_id: string;
      client_email: string;
      private_key: string;
      private_key_id?: string;
      client_id?: string;
    };
  } catch {
    return null;
  }
}

function initAdminApp(): App | null {
  if (getApps().length > 0) return getApps()[0]!;

  const account = buildServiceAccount();
  const projectId =
    account && "projectId" in account
      ? account.projectId
      : account?.project_id ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!projectId) return null;

  if (account) {
    const serviceAccount =
      "clientEmail" in account
        ? {
            projectId: account.projectId,
            clientEmail: account.clientEmail,
            privateKey: account.privateKey,
          }
        : {
            projectId: account.project_id,
            clientEmail: account.client_email,
            privateKey: account.private_key.replace(/\\n/g, "\n"),
          };

    return initializeApp({ credential: cert(serviceAccount), projectId });
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return initializeApp({
      credential: applicationDefault(),
      projectId,
    });
  }

  return null;
}

export function getAdminAuth(): Auth | null {
  const app = initAdminApp();
  if (!app) return null;
  return getAuth(app);
}
