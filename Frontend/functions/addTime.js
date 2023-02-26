
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


export function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // month is zero-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}




