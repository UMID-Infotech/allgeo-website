// server/config/imagekit.js
//
// Generates the short-lived authentication parameters (token, expire,
// signature) that the frontend needs to upload files directly to
// ImageKit using the @imagekit/react `upload()` function.
//
// This does NOT require the `imagekit` or `@imagekit/nodejs` npm package —
// it's just an HMAC-SHA1 signature over "token + expire", signed with your
// ImageKit private key, exactly as ImageKit's own docs describe:
// https://imagekit.io/docs/api-reference/upload-file/client-side-file-upload
//
// Required env vars (server/.env):
//   IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
//   IMAGEKIT_PRIVATE_KEY=private_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
//
// Uses the existing VITE_IMAGEKIT_URL_ENDPOINT value for the urlEndpoint
// (already present in .env for the frontend) so it doesn't need to be
// duplicated. You can override it by setting IMAGEKIT_URL_ENDPOINT instead.

import crypto from "node:crypto";

const PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;
const PUBLIC_KEY = process.env.IMAGEKIT_PUBLIC_KEY;
const URL_ENDPOINT =
  process.env.IMAGEKIT_URL_ENDPOINT || process.env.VITE_IMAGEKIT_URL_ENDPOINT;

// Token is valid for 30 minutes (ImageKit requires it to be under 1 hour).
const TOKEN_VALIDITY_SECONDS = 30 * 60;

export const getImageKitAuthParams = () => {
  if (!PRIVATE_KEY || !PUBLIC_KEY) {
    throw new Error(
      "IMAGEKIT_PUBLIC_KEY and IMAGEKIT_PRIVATE_KEY must be set in the server .env file."
    );
  }

  const token = crypto.randomUUID();
  const expire = Math.floor(Date.now() / 1000) + TOKEN_VALIDITY_SECONDS;

  const signature = crypto
    .createHmac("sha1", PRIVATE_KEY)
    .update(token + expire)
    .digest("hex");

  return {
    token,
    expire,
    signature,
    publicKey: PUBLIC_KEY,
    urlEndpoint: URL_ENDPOINT,
  };
};