import * as generals from "./general";
import * as apps from "./apps";
import * as handlers from "../icon/handlers";
import * as mimes from "../icon/mimetypes";

export const ICON_GROUP_CAPTIONS = {
  general: "General Icons",
  apps: "Apps",
  handlers: "File Handlers",
  mimetypes: "Mimetypes",
};

export function getAllIcons() {
  return { ...generals, ...apps, ...handlers, ...mimes };
}

export function getGroupedIcons() {
  return { generals, apps, handlers, mimes };
}
