async function fbConnection(url) {
  let response = await fetch(url);
  let json = await response.json();
  console.log(json + "in fbConnection");
  return json;
}

export function getSchedule() {}
export function getBus() {}
export async function getMenu() {
  json = await fbConnection(
    `http://pokits-diet-default-rtdb.firebaseio.com/.json`
  );
  console.log(JSON.stringify(json.Diet.body));
  return json.Diet.body;
}
