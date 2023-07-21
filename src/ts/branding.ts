import release from "../assets/branding/systemIcon.svg";
import development from "../assets/branding/devIcon.svg";
import unstable from "../assets/branding/unstIcon.png";
import admin from "../assets/branding/adminIcon.png";
import siege from "../assets/branding/siegeIcon.png";
import { Log } from "./console";
import { LogLevel } from "./console/interface";

const MODES = { release, development, unstable, admin, siege };
export let ARCOS_MODE = "release";

export async function getMode() {
  Log(
    "ts/branding.ts: getMode",
    "Attempting to retrieve mode from /mode",
    LogLevel.info
  );

  try {
    const mode = await (await fetch("./mode")).text();

    ARCOS_MODE = mode.trim();
  } catch {
    ARCOS_MODE = "release";
  }
}

export const Logo = (m?: string) => MODES[m || ARCOS_MODE] || release;
