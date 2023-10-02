export const formatDateTime = (createdAt: string) => {
  const now = new Date();
  const date = new Date(createdAt);
  const diffInMilliseconds = now.getTime() - date.getTime();
  const seconds = Math.floor(diffInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} d`;
  } else if (hours > 0) {
    return `${hours} h`;
  } else if (minutes > 0) {
    return `${minutes} min`;
  } else {
    return `Hace un momento`;
  }
};
