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
export function getFbSchedule() {}
export function getFbBus() {}
export async function getFbMenu() {
  let url = `http://pokits-diet-default-rtdb.firebaseio.com/Diet/.json`;
  // json = await fbConnection(
  //   `http://pokits-diet-default-rtdb.firebaseio.com/Diet/`
  // );
  let response = await fetch(url);
  let json = await response.json();
  // console.log(JSON.stringify(json.body));
  return json.body;
}
