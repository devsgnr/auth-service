import dotenv from "dotenv";

/* Setup .env with dotenv.config() */
dotenv.config();

const env = {
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIRBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    dbUrl: process.env.FIREBASE_DB_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  },
  port: {
    dev: process.env.DEV_PORT,
    prod: process.env.PROD_PORT,
  },
  node_env: process.env.NODE_ENV,
  db: {
    password: process.env.DB_PASSWORD,
  },
  auth: {
    passwordHash: parseInt(String(process.env.PASSWORD_HASH)),
    jwtToken: String(process.env.JWT_TOKEN),
  },
};

export default env;
