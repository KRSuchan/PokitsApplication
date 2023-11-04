// firebase 연결 func (미완)
async function fbConnection(url) {
  // let valid = await fbValidate(url);
  let valid = true;
  if (valid) {
    let response = await fetch(url + `.json`);
    let json = await response.json();
    console.log(json + "in fbConnection");
    return json;
  } else {
  }
}
// firebase 유효 체크 (미완성)
async function fbValidate(url) {
  url += "header/validDataCheck/.json";
  let response = await fetch(url);
  let json = await response.json();
  if (json == true) {
    return true;
  } else if (json == false) {
    return false;
  }
}

export async function getFbCalendar(month) {
  try {
    let url = `https://pokits-scheduler-default-rtdb.firebaseio.com/YearSchedule/body/${month}.json`;
    let response = await fetch(url);
    if (response.ok) {
      // if 모든게 정상이면
      let calendar = await response.json();
      console.log("get UnivSchedule from firebase");
      console.log(calendar);
      return calendar;
    } else {
      // 네트워크 오류가 있으면
      console.error(
        "Network request failed:",
        response.status,
        response.statusText
      );
      let error =
        "Network request failed : " +
        response.status +
        " " +
        response.statusText;
      return error;
    }
  } catch (error) {
    // FB에 접근 못하면
    console.error("An error occurred while fetching data:", error);
    return error;
  }
}
export function getFbBus() {}
export async function getFbMenu() {
  try {
    let url = `https://pokits-diet-default-rtdb.firebaseio.com/Diet/body.json`;
    let response = await fetch(url);
    if (response.ok) {
      // if 모든게 정상이면
      let menu = await response.json();
      console.log("get menu from firebase");
      return menu;
    } else {
      // 네트워크 오류가 있으면
      console.error(
        "Network request failed:",
        response.status,
        response.statusText
      );
      let error =
        "Network request failed : " +
        response.status +
        " " +
        response.statusText;
      return error;
    }
  } catch (error) {
    // FB에 접근 못하면
    console.error("An error occurred while fetching data:", error);
    return error;
  }
}
