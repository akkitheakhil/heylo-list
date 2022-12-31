import * as dotenv from "dotenv";
dotenv.config()

const { FB_CLIENT_EMAIL, FB_PROJECT_ID, FB_PRIVATE_KEY, FB_PROJECT_ID_DEV } = process.env;

export const firebaseConfig = {
    clientEmail: FB_CLIENT_EMAIL,
    projectId: FB_PROJECT_ID,
    privateKey: FB_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
}
