function displayDate() {
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayOfWeek = days[now.getDay()];
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  document.getElementById("day").textContent = dayOfWeek;
  document.getElementById("dateSpan").textContent = `${day}.${month}.${year}`;
}

displayDate();
export default displayDate;
