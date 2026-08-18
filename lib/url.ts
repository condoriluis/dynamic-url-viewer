export type ResourceType =
  | "pdf"
  | "image"
  | "video"
  | "audio"
  | "document"
  | "web"
  | "unknown";

export function detectResourceType(
  url: string,
  contentType?: string | null
): ResourceType {
  const type = contentType?.toLowerCase() ?? "";

  if (type.includes("application/pdf")) {
    return "pdf";
  }

  if (type.startsWith("image/")) {
    return "image";
  }

  if (type.startsWith("video/")) {
    return "video";
  }

  if (type.startsWith("audio/")) {
    return "audio";
  }

  if (
    type.includes("application/msword") ||
    type.includes(
      "application/vnd.openxmlformats-officedocument"
    ) ||
    type.includes("text/plain")
  ) {
    return "document";
  }

  let pathname = "";

  try {
    pathname = new URL(url).pathname.toLowerCase();
  } catch {
    return "unknown";
  }

  if (/\.pdf$/.test(pathname)) {
    return "pdf";
  }

  if (
    /\.(jpg|jpeg|png|gif|webp|avif|svg)$/.test(pathname)
  ) {
    return "image";
  }

  if (
    /\.(mp4|webm|mov|m4v)$/.test(pathname)
  ) {
    return "video";
  }

  if (
    /\.(mp3|wav|ogg|m4a|aac)$/.test(pathname)
  ) {
    return "audio";
  }

  if (
    /\.(doc|docx|xls|xlsx|ppt|pptx|txt|csv)$/.test(pathname)
  ) {
    return "document";
  }

  if (
    type.includes("text/html") ||
    type === ""
  ) {
    return "web";
  }

  return "unknown";
}