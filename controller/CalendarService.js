import { getFbCalendar } from "../firebase";

let univCal = {};
let calendar = {
  Jan: [],
  Feb: [],
  Mar: [],
  Apr: [],
  May: [],
  Jun: [],
  Jul: [],
  Aug: [],
  Sep: [],
  Oct: [],
  Nov: [],
  Dec: [],
};
let thisMonth = new Date().getMonth();
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function setMonthCalendar(month, object) {
  switch (month) {
    case 0:
      calendar.Jan = JSON.parse(JSON.stringify(object));
      break;
    case 1:
      calendar.Feb = JSON.parse(JSON.stringify(object));
      break;
    case 2:
      calendar.Mar = JSON.parse(JSON.stringify(object));
      break;
    case 3:
      calendar.Apr = JSON.parse(JSON.stringify(object));
      break;
    case 4:
      calendar.May = JSON.parse(JSON.stringify(object));
      break;
    case 5:
      calendar.Jun = JSON.parse(JSON.stringify(object));
      break;
    case 6:
      calendar.Jul = JSON.parse(JSON.stringify(object));
      break;
    case 7:
      calendar.Aug = JSON.parse(JSON.stringify(object));
      break;
    case 8:
      calendar.Sep = JSON.parse(JSON.stringify(object));
      break;
    case 9:
      calendar.Oct = JSON.parse(JSON.stringify(object));
      break;
    case 10:
      calendar.Nov = JSON.parse(JSON.stringify(object));
      break;
    case 11:
      calendar.Dec = JSON.parse(JSON.stringify(object));
      break;
  }
  return null;
}
function getParsedMonthCalendar(month) {
  switch (month) {
    case 0:
      return calendar.Jan;
    case 1:
      return calendar.Feb;
    case 2:
      return calendar.Mar;
    case 3:
      return calendar.Apr;
    case 4:
      return calendar.May;
    case 5:
      return calendar.Jun;
    case 6:
      return calendar.Jul;
    case 7:
      return calendar.Aug;
    case 8:
      return calendar.Sep;
    case 9:
      return calendar.Oct;
    case 10:
      console.log(Object.keys(calendar.Nov));
      return calendar.Nov;
    case 11:
      return calendar.Dec;
  }
  return null;
}

function hasMonthCalendar(month) {
  let param = getParsedMonthCalendar(month);
  if (!param || param.length === 0) {
    console.log("calendar null");
    return false;
  } else {
    console.log("calendar not null");
    return true;
  }
}
export function dateFormatter(json) {
  let time = new Date();
  let year = time.getFullYear();
  let month = Number(popMonth(json));
  let date = Number(popDate(json));
  let day = year + "-" + month + "-" + date;
  return day;
}
export function ddayCalculator(day) {
  const time = new Date();
  const endday = new Date(day);
  const diff = endday - time;
  return Math.floor(diff / (1000 * 60 * 60 * 24) + 1);
}
export async function getCalendar(month) {
  console.log(month);
  if (hasMonthCalendar(month) == false) {
    setMonthCalendar(
      month,
      JSON.parse(JSON.stringify(await getFbCalendar(months[month])))
    );
    console.log("it's empty so set");
  }
  let cal = JSON.parse(JSON.stringify(getParsedMonthCalendar(month)));
  return cal;
}
function getNotClassDayCalendar(data) {
  let temp = [];
  console.log("in get Notclassdaycalendar");
  for (let i = 0; i < data.length; i++) {
    if (!data[i].contents.includes("수업일수")) {
      temp.push(data[i]);
      console.log(data[i].contents);
    }
  }
  console.log("out get Notclassdaycalendar");

  return temp;
}
function popDate(string) {
  return string.split("(")[0].split(".")[1];
}
function popMonth(string) {
  return string.split(".")[0];
}
function popOnly2CalendarDday(data) {
  let temp = [];

  let year = new Date().getFullYear();
  let cnt = 0;
  for (let i = 0; i < data.length; i++) {
    let startMonth = Number(popMonth(data[i].startDay));
    let endMonth = Number(popMonth(data[i].endDay));
    let startDate = Number(popDate(data[i].startDay));
    let endDate = Number(popDate(data[i].endDay));
    let startDay = year + "-" + startMonth + "-" + startDate;
    let endDay = year + "-" + endMonth + "-" + endDate;
    let startDday = ddayCalculator(startDay);
    let endDday = ddayCalculator(endDay);
    if (!(endDday < 0)) {
      temp.push(data[i]);
      cnt++;
    }
    if (cnt == 2) {
      break;
    }
  }
  return temp;
}
export async function getMainCalendar(month, classMark) {
  console.log(month);
  if (hasMonthCalendar(month) == false) {
    setMonthCalendar(
      month,
      JSON.parse(JSON.stringify(await getFbCalendar(months[month])))
    );
    console.log("it's empty so set");
  }
  let cal = JSON.parse(JSON.stringify(getParsedMonthCalendar(month)));
  if (classMark) {
    cal = getNotClassDayCalendar(cal);
  }
  cal = popOnly2CalendarDday(cal);
  return cal;
}
export async function getThisMonthCalendar() {
  if (Object.keys(univCal).length === 0) {
    univCal = JSON.parse(JSON.stringify(await getCalendar(thisMonth)));
  }
  return univCal;
}
