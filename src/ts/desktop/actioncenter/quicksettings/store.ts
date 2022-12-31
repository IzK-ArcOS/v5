import { importDefault } from "../../../applogic/imports";
import { UserData } from "../../../userlogic/interfaces";
import type { QuickSetting } from "./interface";

export const QuickSettings: QuickSetting[] = [
  {
    icon: "motion_photos_on",
    iconOff: "motion_photos_off",
    getter(udata) {
      return udata.sh.anim;
    },
    setter(udata) {
      udata.sh.anim = !udata.sh.anim;

      UserData.set(udata);

      return udata.sh.anim;
    },
    caption: "Animations",
  },
  {
    icon: "blur_on",
    iconOff: "blur_off",
    getter(udata) {
      return !udata.sh.noGlass;
    },
    setter(udata) {
      udata.sh.noGlass = !udata.sh.noGlass;

      UserData.set(udata);

      return !udata.sh.noGlass;
    },
    caption: "Transparency",
  },
  {
    icon: "autorenew",
    iconOff: "autorenew",
    getter() {
      return false;
    },
    setter(udata) {
      importDefault();

      return false;
    },
    caption: "Reload Apps",
  },
  {
    icon: "",
    iconOff: "",
    getter() {
      return false;
    },
    setter() {
      return false;
    },
    caption: "",
  },
  {
    icon: "",
    iconOff: "",
    getter() {
      return false;
    },
    setter() {
      return false;
    },
    caption: "",
  },
  {
    icon: "",
    iconOff: "",
    getter() {
      return false;
    },
    setter() {
      return false;
    },
    caption: "",
  },
  {
    icon: "",
    iconOff: "",
    getter() {
      return false;
    },
    setter() {
      return false;
    },
    caption: "",
  },
  {
    icon: "",
    iconOff: "",
    getter() {
      return false;
    },
    setter() {
      return false;
    },
    caption: "",
  },
  {
    icon: "",
    iconOff: "",
    getter() {
      return false;
    },
    setter() {
      return false;
    },
    caption: "",
  },
];
