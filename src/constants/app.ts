export const DEPLOY_ENV = process.env.REACT_APP_DEPLOY_ENV as string;
export const NODE_ENV = process.env.NODE_ENV as string;
export const FIREBASE_AUTH_EMULATOR_PORT = process.env
  .REACT_APP_FIREBASE_AUTH_EMULATOR_PORT as string;
export const FIREBASE_FIREBASE_EMULATOR_PORT = process.env
  .REACT_APP_FIREBASE_FIRESTORE_EMULATOR_PORT as string;
export type HTTPRequestMethods = "GET" | "POST" | "PATCH" | "DELETE";
export const APP_DEPLOYMENT_PRODUCTION = "https://findnus.netlify.app/";
export const APP_DEPLOYMENT_DEVELOPMENT =
  "https://transcendent-beijinho-1ca1f9.netlify.app/";
export const MAPS_EMBED_KEY = process.env.REACT_APP_MAPS_EMBED_KEY as string;
export const MAPS_GEOCODING_KEY = process.env
  .REACT_APP_MAPS_GEOCODING_KEY as string;

const keys = [
  DEPLOY_ENV,
  NODE_ENV,
  FIREBASE_AUTH_EMULATOR_PORT,
  FIREBASE_FIREBASE_EMULATOR_PORT,
  APP_DEPLOYMENT_PRODUCTION,
  APP_DEPLOYMENT_DEVELOPMENT,
  MAPS_EMBED_KEY,
  MAPS_GEOCODING_KEY,
];

// verify if environment variables are defined
keys.forEach((key, i) => {
  if (!key) {
    if (DEPLOY_ENV !== "production" && (i === 2 || i === 3)) return;

    console.error(
      `Environment variable(s) not properly configured! (Debug code: ${i})`
    );
  }
});
