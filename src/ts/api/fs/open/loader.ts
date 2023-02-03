import type { ArcFile } from "../../../applogic/interface";
import type { UserFileLoader } from "../../interface";
import apLoaderIcon from "../../../../assets/handlers/apploader.svg";
import pdfOpenerIcon from "../../../../assets/handlers/pdfopener.svg";
import openInNewIcon from "../../../../assets/handlers/openinnew.svg";
import { loadAppFile } from "../../../applogic/aftermarket/loader";

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
