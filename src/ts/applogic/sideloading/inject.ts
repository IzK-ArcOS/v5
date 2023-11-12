import * as events from "../events";
import * as icon from "../icon";
import * as checks from "../checks";
import * as maximize from "../maximize";
import * as pref from "../pref";
import * as store from "../store";
import * as title from "../title";
/** */
import * as build from "../../branding/build";
import * as mode from "../../branding/mode";
import { ARCOS_MODE, Logo } from "../../branding";
import { ArcOSVersion } from "../../env/main";
/** */
import * as base64 from "../../base64";
import * as color from "../../color";
import * as json from "../../json";
import sleep from "../../sleep";
import ttlFetch from "../../ttlFetch";
/** */
import * as console from "../../console";
/** */
import * as hierarchy from "../../hierarchy";
import { loadWindow } from "../load";

export function injectExposedAPIs() {
  window.ArcOS = {
    applogic: {
      loadWindow,
      ...events,
      ...icon,
      ...checks,
      ...maximize,
      ...pref,
      ...store,
      ...title,
    },
    branding: { ...build, ...mode, ARCOS_MODE, ArcOSVersion, Logo },
    utils: { ...base64, ...color, ...json, sleep, ttlFetch },
    arcConsole: console,
    hierarchy,
  };
}
