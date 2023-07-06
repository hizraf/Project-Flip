function helpers(createdDate) {
  let currentTime = new Date();
  let hourDiff = currentTime.getHours() - createdDate.getHours();
  let minuteDiff = currentTime.getMinutes() - createdDate.getMinutes();

  if (minuteDiff < 0) {
    minuteDiff += 60;
    hourDiff--;
  }

  if (hourDiff) return `${hourDiff} hours and ${minuteDiff} minutes ago`;
  else return `${minuteDiff} minutes ago`;

}

module.exports = { helpers };