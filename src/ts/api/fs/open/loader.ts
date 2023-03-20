import type { ArcFile } from "../../../applogic/interface";
import type { UserFileLoader } from "../../interface";
import apLoaderIcon from "../../../../assets/handlers/apploader.svg";
import pdfOpenerIcon from "../../../../assets/handlers/pdfopener.svg";
import openInNewIcon from "../../../../assets/handlers/openinnew.svg";
import loadThemeIcon from "../../../../assets/handlers/loadtheme.svg";
import textEditorIcon from "../../../../assets/apps/apppoker.svg";
import { loadAppFile } from "../../../applogic/aftermarket/loader";
import { errorMessage } from "../../../errorlogic/main";
import { loadTheme, verifyTheme } from "../../../userlogic/themes/main";
import type { UserTheme } from "../../../userlogic/themes/interface";
import { openWith } from "../open";

export const FileLoaders: { [key: string]: UserFileLoader } = {
  appLoader: {
    name: "Application Import",
    description: "Load a third-party application",
    icon: apLoaderIcon,
    loader: loadAppFile,
    extensions: [".app", ".ealc", ".app.json"],
  },
  pdfOpener: {
    name: "Open In New Tab",
    description: "Open a PDF file in a new browser tab",
    icon: pdfOpenerIcon,
    loader: (file) => {
      const f = new Blob([new Uint8Array(file.data)], {
        type: "application/pdf",
      });

      window.open(URL.createObjectURL(f), "_blank");
    },
    extensions: [".pdf"],
  },
  loadTheme: {
    name: "Load theme file",
    description: "Apply theme file to ArcOS",
    loader: (file) => {
      const str = String.fromCharCode.apply(null, new Uint8Array(file.data));

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
    name: "Edit file",
    description: "Open file in Text Editor",
    icon: textEditorIcon,
    loader(file) {
      openWith("TextEditor", file, true);
    },
    extensions: [],
  },
  openInNew: {
    name: "Download",
    description: "Open file in a new tab to download it",
    loader: (file) => {
      const f = new Blob([new Uint8Array(file.data)], {
        type: file.mime.split(";")[0],
      });

      window.open(URL.createObjectURL(f), "_blank");
    },
    icon: openInNewIcon,
    extensions: [],
  },
};
