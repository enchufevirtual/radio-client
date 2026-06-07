const INVALID_IMAGE_PATTERN = /^\s*(null|undefined)\s*$/i;

export function normalizeImageValue(
  image?: string | File | Blob | null
): string | File | Blob | null {
  if (image instanceof Blob) {
    return image;
  }

  if (typeof image === 'string') {
    const sanitized = image.trim();
    if (sanitized.length === 0 || INVALID_IMAGE_PATTERN.test(sanitized)) {
      return null;
    }
    return sanitized;
  }

  return null;
}

export function getAvatarUrl(
  image?: string | File | Blob | null,
  username?: string
): string {
  const backend = (process.env.BACKEND_URL ?? "").replace(/\/$/, "");
  const userName = (username?.trim() || "radio-ev").replace(/\s+/g, "-");

  const normalizedImage = normalizeImageValue(image);

  if (normalizedImage instanceof Blob) {
    try {
      return URL.createObjectURL(normalizedImage);
    } catch {
      return `https://api.dicebear.com/7.x/identicon/svg?seed=${userName}`;
    }
  }

  if (typeof normalizedImage === "string") {
    if (/^https?:\/\//.test(normalizedImage)) return normalizedImage;

    const normalized = normalizedImage.startsWith("/") ? normalizedImage : `/${normalizedImage}`;

    return `${backend}/uploads${normalized}`;
  }

  return `https://api.dicebear.com/7.x/identicon/svg?seed=${userName}`;
}

