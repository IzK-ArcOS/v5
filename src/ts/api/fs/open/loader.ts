import type { ArcFile } from "../../../applogic/interface";
import type { UserFileLoader } from "../../interface";
import sd from "../../../../assets/sd.svg";
import pdf from "../../../../assets/pdf.svg";
import { loadAppFile } from "../../../applogic/aftermarket/loader";

export const FileLoaders: { [key: string]: UserFileLoader } = {
  appLoader: {
    name: "Application Import",
    description: "Load a third-party application",
    icon: sd,
    loader: loadAppFile,
    extensions: [".app", ".ealc", ".app.json"],
  },
  pdfOpener: {
    name: "Open In New Tab",
    description: "Open a PDF file in a new browser tab",
    icon: pdf,
    loader: (file) => {
      const f = new Blob([new Uint8Array(file.data)], {
        type: "application/pdf",
      });

      window.open(URL.createObjectURL(f), "_blank");
    },
    extensions: [".pdf"],
  },
};
