import systemIcon from "../assets/systemIcon.svg";
import devIcon from "../assets/devIcon.svg";
import { Dev } from "./env/main";

export const Logo = () => (Dev ? devIcon : systemIcon);
