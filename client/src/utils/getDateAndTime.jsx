export default function getDateAndTime() {
  const date = new Date()
  return date.toLocaleDateString() + "T" + date.getHours() + ":" + date.getMinutes()
}