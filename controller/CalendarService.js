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
export async function getThisMonthCalendar() {
  if (Object.keys(univCal).length === 0) {
    univCal = JSON.parse(JSON.stringify(await getCalendar(thisMonth)));
  }
  return univCal;
}
