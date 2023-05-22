export const formatDateTime = (date: Date) => {
  const newDate = new Date(date);
  const hour = newDate.getHours();
  const minute = newDate.getMinutes();
  const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  const formattedDate = new Intl.DateTimeFormat('es-EC', { month: 'long', day: 'numeric', weekday: 'long' }).format(newDate);
  const formattedDateTime = `${formattedDate}, ${formattedTime}`;
  return formattedDateTime;
}
