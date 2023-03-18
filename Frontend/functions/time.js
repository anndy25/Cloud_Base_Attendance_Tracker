
export function addTime(hours, minutes, seconds, addMinutes, addSeconds) {


  hours = (hours + Math.floor((minutes + addMinutes) / 60) + Math.floor((seconds + addSeconds) / 60)) % 24;
  minutes = (minutes + addMinutes) % 60;
  seconds = (seconds + addSeconds) % 60;

  const result24hr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  let amPm = 'AM';
  if (hours === 0) {
    hours = 12;
  } else if (hours === 12) {
    amPm = 'PM';
  } else if (hours > 12) {
    hours -= 12;
    amPm = 'PM';
  }

  const result12hr = `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;


  return { result24hr, result12hr };

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

export function getCurrentDate() {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}-${month}-${year}`;
}





