import { getFbMenu } from "../firebase";

let menu = {};
let concatedMenu = {};
let onlyMenu = {};

function cutterMenuInfo(param) {
  let array = param;
  let result = [];
  if (typeof array == "object") {
    len = array.length;
    for (let i = 0; i < len; i++) {
      if (array[i][0] == "[" || (array[i][0] >= 0 && array[i][0] <= 9)) {
        continue;
      } else {
        result.push(array[i]);
      }
    }
  }
  return result;
}
// menu 조식, 중식, 석식 타이틀 추가 func
function menuConcator(param) {
  concatedMenu = JSON.parse(JSON.stringify(param));
  concatedMenu.student.breakfast = ["조식\n"].concat(
    concatedMenu.student.breakfast
  );
  concatedMenu.student.lunch = ["중식\n"].concat(concatedMenu.student.lunch);
  concatedMenu.faculty.lunch = ["중식\n"].concat(concatedMenu.faculty.lunch);
  concatedMenu.faculty.dinner = ["석식\n"].concat(concatedMenu.faculty.dinner);
  concatedMenu.snackBar.breakfast = concatedMenu.snackBar.breakfast;
  concatedMenu.puroom.lunch = ["중식\n"].concat(concatedMenu.puroom.lunch);
  concatedMenu.puroom.dinner = ["석식\n"].concat(concatedMenu.puroom.dinner);
  concatedMenu.oreum1.lunch = ["중식\n"].concat(concatedMenu.oreum1.lunch);
  concatedMenu.oreum1.dinner = ["석식\n"].concat(concatedMenu.oreum1.dinner);
  concatedMenu.oreum3.lunch = ["중식\n"].concat(concatedMenu.oreum3.lunch);
  concatedMenu.oreum3.dinner = ["석식\n"].concat(concatedMenu.oreum3.dinner);

  return concatedMenu;
}
//  menu만 보이게 하는 func
function onlyMenuMaker(param) {
  onlyMenu = JSON.parse(JSON.stringify(param));
  onlyMenu.student.breakfast = cutterMenuInfo(onlyMenu.student.breakfast);
  onlyMenu.student.lunch = cutterMenuInfo(onlyMenu.student.lunch);
  onlyMenu.faculty.lunch = cutterMenuInfo(onlyMenu.faculty.lunch);
  onlyMenu.faculty.dinner = cutterMenuInfo(onlyMenu.faculty.dinner);
  onlyMenu.snackBar.breakfast = cutterMenuInfo(onlyMenu.snackBar.breakfast);
  onlyMenu.puroom.lunch = cutterMenuInfo(onlyMenu.puroom.lunch);
  onlyMenu.puroom.dinner = cutterMenuInfo(onlyMenu.puroom.dinner);
  onlyMenu.oreum1.lunch = cutterMenuInfo(onlyMenu.oreum1.lunch);
  onlyMenu.oreum1.dinner = cutterMenuInfo(onlyMenu.oreum1.dinner);
  onlyMenu.oreum3.lunch = cutterMenuInfo(onlyMenu.oreum3.lunch);
  onlyMenu.oreum3.dinner = cutterMenuInfo(onlyMenu.oreum3.dinner);
  return onlyMenu;
}
export async function getCtrlMenu() {
  if (Object.keys(menu).length === 0) {
    menu = JSON.parse(JSON.stringify(await getFbMenu()));
  }
  if (Object.keys(concatedMenu).length === 0) {
    concatedMenu = JSON.parse(JSON.stringify(menuConcator(menu)));
  }
  return concatedMenu;
}
export async function getOnlyMenu() {
  if (Object.keys(menu).length === 0) {
    menu = JSON.parse(JSON.stringify(await getFbMenu()));
  }
  if (Object.keys(onlyMenu).length === 0) {
    onlyMenu = await JSON.parse(JSON.stringify(onlyMenuMaker(menu)));
    console.log("int getonly menu on first statement" + onlyMenu);
  }
  return onlyMenu;
}
