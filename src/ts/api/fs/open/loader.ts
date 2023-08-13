import textEditorIcon from "../../../../assets/apps/apppoker.svg";
import loadThemeIcon from "../../../../assets/handlers/loadtheme.svg";
import openInNewIcon from "../../../../assets/handlers/openinnew.svg";
import pdfOpenerIcon from "../../../../assets/handlers/pdfopener.svg";
import { errorMessage } from "../../../errorlogic/main";
import type { UserTheme } from "../../../userlogic/themes/interface";
import { loadTheme, verifyTheme } from "../../../userlogic/themes/main";
import type { UserFileLoader } from "../../interface";
import { arrayToBlob, arrayToText } from "../file/conversion";
import { openWith } from "./main";

export const FileLoaders: { [key: string]: UserFileLoader } = {
  pdfOpener: {
    name: "Open In New Tab",
    description: "Open a PDF file in a new browser tab",
    icon: pdfOpenerIcon,
    loader: (file) => {
      const f = arrayToBlob(file.data, "application/pdf");

      window.open(URL.createObjectURL(f), "_blank");
    },
    extensions: [".pdf"],
  },
  loadTheme: {
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
          loadThemeIcon,
          null,
          { caption: "OK", action() {} }
        );

      loadTheme(json as UserTheme);
    },
    icon: loadThemeIcon,
    extensions: [".arctheme"],
  },
  editFile: {
    name: "Edit config file",
    description: "Open file in Text Editor",
    icon: textEditorIcon,
    loader(file) {
      openWith("TextEditor", file, true);
    },
    extensions: [".conf"],
  },
  openInNew: {
    name: "Download",
    description: "Open file in a new tab to download it",
    loader: (file) => {
      const f = arrayToBlob(file.data, file.mime.split(";")[0]);

      window.open(URL.createObjectURL(f), "_blank");
    },
    icon: openInNewIcon,
    extensions: [],
  },
};
