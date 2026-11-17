// src/lib/imagekitUpload.js
//
// Uploads a file straight from the browser to ImageKit and returns its URL.
// Used by the blog "Featured Image" field AND by the CKEditor image upload.
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";

import { getBlogImageKitAuth } from "@/services/blogService";

export async function uploadImageToImageKit(
  file,
  { folder = "/allgeo-solutions/blogs", onProgress, abortSignal } = {},
) {
  const auth = await getBlogImageKitAuth();

  try {
    const result = await upload({
      file,
      fileName: file.name,
      token: auth.token,
      expire: auth.expire,
      signature: auth.signature,
      publicKey: auth.publicKey,
      urlEndpoint: auth.urlEndpoint,
      folder,
      useUniqueFileName: true,
      abortSignal,
      onProgress: (event) => {
        if (onProgress && event.total) {
          onProgress(Math.round((event.loaded / event.total) * 100));
        }
      },
    });

    return result.url;
  } catch (error) {
    if (error instanceof ImageKitAbortError) {
      throw new Error("Upload was cancelled.", { cause: error });
    }
    if (error instanceof ImageKitInvalidRequestError) {
      throw new Error(`Invalid upload request: ${error.message}`, { cause: error });
    }
    if (error instanceof ImageKitUploadNetworkError) {
      throw new Error("Network error while uploading. Please try again.", { cause: error });
    }
    if (error instanceof ImageKitServerError) {
      throw new Error(`ImageKit server error: ${error.message}`, { cause: error });
    }
    throw error;
  }
}

// Resolves a stored image value to a usable URL (full URLs are kept as is).
export function resolveImageUrl(value) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;

  const endpoint =
    import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT?.replace(/\/$/, "") ?? "";
  return `${endpoint}${value.startsWith("/") ? "" : "/"}${value}`;
}