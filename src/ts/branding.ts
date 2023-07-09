import release from "../assets/branding/systemIcon.svg";
import development from "../assets/branding/devIcon.svg";
import unstable from "../assets/branding/unstIcon.png";
import admin from "../assets/branding/adminIcon.png";
import siege from "../assets/branding/siegeIcon.png";

const MODES = { release, development, unstable, admin, siege };
const ARCOS_MODE = "development";

export const Logo = (m?: string) => MODES[m || ARCOS_MODE] || release;
