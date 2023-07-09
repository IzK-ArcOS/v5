import release from "../assets/branding/systemIcon.svg";
import development from "../assets/branding/devIcon.svg";
import unstable from "../assets/branding/unstIcon.png";
import admin from "../assets/branding/adminIcon.png";
import siege from "../assets/branding/siegeIcon.png";

const MODES = { release, development, unstable, admin, siege };
let ARCOS_MODE = "development";

export async function getMode() {
  try {
    const mode = await (await fetch("./mode")).text();

    ARCOS_MODE = mode.trim();

    console.log(mode);
  } catch {
    ARCOS_MODE = "release";
  }
}

export const Logo = (m?: string) => MODES[m || ARCOS_MODE] || release;
