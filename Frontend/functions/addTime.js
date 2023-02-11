
export function addTime(hours, minutes, addMinutes) {
  hours = (hours + Math.floor((minutes + addMinutes) / 60)) % 24;
  minutes = (minutes + addMinutes) % 60;

  let amPm = 'AM';
  if (hours === 0) {
    hours = 12;
  } else if (hours === 12) {
    amPm = 'PM';
  } else if (hours > 12) {
    hours -= 12;
    amPm = 'PM';
  }

  let result = `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
  return result;


}
export function getFormattedDate() {
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  let now = new Date();
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  return `${day}, ${year} ${month}`;
}





