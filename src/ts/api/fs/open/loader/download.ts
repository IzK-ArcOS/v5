import { OpenInNewIcon } from "../../../../icon/handlers";
import type { UserFileLoader } from "../../../interface";
import { arrayToBlob } from "../../file/conversion";

const loader: UserFileLoader = {
  name: "Download",
  description: "Open file in a new tab to download it",
  loader: (file) => {
    if (!file) return;

    const f = arrayToBlob(file.data, file.mime.split(";")[0]);

    window.open(URL.createObjectURL(f), "_blank");
  },
  icon: OpenInNewIcon,
  extensions: [],
};

export default loader;
