export const formatDate = (date: string) => {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat('es-EC', { dateStyle: 'long' }).format(newDate);
}
