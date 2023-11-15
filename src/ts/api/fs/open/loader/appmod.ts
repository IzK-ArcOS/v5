import { Sideload } from "../../../../applogic/sideloading/main";
import { errorMessage } from "../../../../errorlogic/main";
import { LoadAppModuleIcon } from "../../../../icon/handlers";
import { tryParse } from "../../../../json";
import type { UserFileLoader } from "../../../interface";
import { arrayToText } from "../../file/conversion";

const loader: UserFileLoader = {
  name: "Load App",
  description: "Experimental: load app module",
  loader: (file) => {
    if (!file)
      return errorMessage(
        "Can't load app",
        "ArcOS couldn't load the file you tried to open. Please restart and try again.",
        LoadAppModuleIcon,
        null,
        { caption: "Okay", action() {}, suggested: true }
      );

    const text = arrayToText(file.data);
    const json = tryParse(text);

    if (typeof json != "object" || !json.tag || !json.module)
      return errorMessage(
        "Can't load app",
        "The JSON could not be parsed. Please check the file contents and try again. If you didn't make the app, contact the developer for a working version.",
        LoadAppModuleIcon,
        null,
        { caption: "Okay", action() {}, suggested: true }
      );

    Sideload({ ...json });
  },
  icon: LoadAppModuleIcon,
  extensions: [".appmod"],
};

export default loader;
