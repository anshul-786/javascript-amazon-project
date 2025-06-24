export default function isWeekend(date) {
  const day = date.format('dddd');
  return ['Saturday', 'Sunday'].includes(day);
}