import { capitalize } from "lodash";

String.prototype.strCapitalization = function () {
  if (this.includes("'"))
    return this.split("'")
      .map((w) => capitalize(w))
      .join("'");

  if (this.includes(" "))
    return this.split(" ")
      .map((w) => capitalize(w).trim())
      .join(" ");

  return capitalize(this);
};

String.prototype.numberToEuroString = function () {
  let val = this;

  if (val.includes(",")) {
    val = parseFloat(val.split(",").join(".")) * 100;
  } else if (val.includes(".")) {
    val = parseFloat(val) * 100;
  }

  let parsed = parseFloat(val / 100).toFixed(2) + "€";
  return parsed;
};

/* The above code converts a number of seconds into a HH:MM:SS format. */
String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (hours != "00") {
    return hours + ":" + minutes + ":" + seconds;
  } else {
    return minutes + ":" + seconds;
  }
};
