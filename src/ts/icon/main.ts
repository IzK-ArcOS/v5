import * as generals from "./general";
import * as apps from "./apps";
import * as handlers from "../icon/handlers";
import * as mimes from "../icon/mimetypes";
import * as power from "../icon/power";

export const ICON_GROUP_CAPTIONS = {
  generals: "General Icons",
  apps: "Apps",
  handlers: "File Handlers",
  mimes: "Mimetypes",
  power: "Power Icons",
};

export function getAllIcons() {
  return { ...generals, ...apps, ...handlers, ...mimes, ...power };
}

export function getGroupedIcons() {
  return { generals, apps, handlers, mimes, power };
}
