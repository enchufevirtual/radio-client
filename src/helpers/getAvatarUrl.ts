export function getAvatarUrl(image?: string | File | Blob | null, name?: string): string {
  const backend = (process.env.BACKEND_URL ?? "").replace(/\/$/, "");
  const userName = (name?.trim() || "radio-ev").replace(/\s+/g, "-");

  if (image instanceof Blob) {
    try {
      return URL.createObjectURL(image);
    } catch (err) {
      // fallback to default avatar if createObjectURL is not available
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`;
    }
  }

  if (typeof image === "string" && image.length > 0) {
    if (/^https?:\/\//.test(image)) return image;
    return image.startsWith("/") ? `${backend}${image}` : `${backend}/${image}`;
  }

  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`;
}
