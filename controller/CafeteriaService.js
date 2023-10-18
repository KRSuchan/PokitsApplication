import getFbMenu from "../firebase";

export function getMenu() {
  let menu = getFbMenu();
  // menu = menu.replace("\\n", "\n");
  return menu;
}
