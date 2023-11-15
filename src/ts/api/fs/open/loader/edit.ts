import { AppPokerIcon } from "../../../../icon/apps";
import type { UserFileLoader } from "../../../interface";
import { openWith } from "../main";

const loader: UserFileLoader = {
  name: "Edit config file",
  description: "Open file in Text Editor",
  icon: AppPokerIcon,
  loader(file) {
    openWith("TextEditor", file, true);
  },
  extensions: [".conf"],
};

export default loader;
