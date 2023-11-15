import { PdfOpenerIcon } from "../../../../icon/handlers";
import type { UserFileLoader } from "../../../interface";
import { arrayToBlob } from "../../file/conversion";

const loader: UserFileLoader = {
  name: "Open In New Tab",
  description: "Open a PDF file in a new browser tab",
  icon: PdfOpenerIcon,
  loader: (file) => {
    const f = arrayToBlob(file.data, "application/pdf");

    window.open(URL.createObjectURL(f), "_blank");
  },
  extensions: [".pdf"],
};

export default loader;
