export function getAvatarUrl(image?: string | File | Blob | null, name?: string): string {
  const api = process.env.API_AVATAR ?? "https://api.multiavatar.com";
  const key = process.env.API_KEY;
  const backend = (process.env.BACKEND_URL ?? "").replace(/\/$/, "");
  const userName = (name?.trim() || "radio-ev").replace(/\s+/g, "-");

  if (image instanceof Blob) {
    try {
      return URL.createObjectURL(image);
    } catch (err) {
      // fallback to default avatar if createObjectURL is not available
      return key ? `${api}/${userName}.png?apikey=${key}` : `${api}/${userName}.svg`;
    }
  }

  if (typeof image === "string" && image.length > 0) {
    if (/^https?:\/\//.test(image)) return image;
    return image.startsWith("/") ? `${backend}${image}` : `${backend}/${image}`;
  }

  return key ? `${api}/${userName}.png?apikey=${key}` : `${api}/${userName}.svg`;
}
