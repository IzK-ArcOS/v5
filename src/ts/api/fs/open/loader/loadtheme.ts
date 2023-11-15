import { errorMessage } from "../../../../errorlogic/main";
import { LoadThemeIcon } from "../../../../icon/handlers";
import type { UserTheme } from "../../../../userlogic/themes/interface";
import { loadTheme, verifyTheme } from "../../../../userlogic/themes/main";
import type { UserFileLoader } from "../../../interface";
import { arrayToText } from "../../file/conversion";

const loader: UserFileLoader = {
  name: "Load theme file",
  description: "Apply theme file to ArcOS",
  loader: (file) => {
    const str = arrayToText(file.data);

    let json;

    try {
      json = JSON.parse(str);
    } catch {
      json = false;
    }

    if (!json || !verifyTheme(json))
      return errorMessage(
        "Unable to load theme",
        "The theme file is invalid, or it could not be parsed. Please make sure you are trying to load a theme, and then try again.",
        LoadThemeIcon,
        null,
        { caption: "Okay", action() {}, suggested: true }
      );

    loadTheme(json as UserTheme);
  },
  icon: LoadThemeIcon,
  extensions: [".arctheme"],
};

export default loader;
