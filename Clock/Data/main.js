const $ = document.querySelector.bind(document);

let time;
let hour;
let minute;
let second;
let day;
let month;
let year;

let clockHour = $(".hours");
let clockMinutes = $(".minutes");
let clockSecons = $(".secons");
let digitalClock = $(".clock-digital");
let fullDay = $(".day");

function clock() {
    time = new Date();
    hour = time.getHours();
    minute = time.getMinutes();
    second = time.getSeconds();
    hour = hour % 12;

    let SeconDeg = second * 6;
    let MinuteDeg = minute * 6 + SeconDeg / 60;
    let HourDeg = hour * 30 + (minute * 30) / 60;
    clockHour.style.transform = "rotate(" + HourDeg + "deg)";
    clockMinutes.style.transform = "rotate(" + MinuteDeg + "deg)";
    clockSecons.style.transform = "rotate(" + SeconDeg + "deg)";
}
function hvn() {
    time = new Date();

    day = time.getDate();
    month = time.getMonth() + 1;
    year = time.getFullYear();
    hour = time.getHours();
    minute = time.getMinutes();
    second = time.getSeconds();
    console.log(day, month, year);
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }
    let now = hour + " : " + minute + " : " + second;
    let dayMonthYear = `${day} / ${month} / ${year}`;
    digitalClock.innerHTML = now;
    fullDay.innerHTML = dayMonthYear;
    clock();
}
setInterval("hvn()", 1000);
