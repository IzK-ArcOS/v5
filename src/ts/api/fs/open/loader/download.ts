import { OpenInNewIcon } from "../../../../icon/handlers";
import type { UserFileLoader } from "../../../interface";
import { DownloadFile } from "../../download";

const loader: UserFileLoader = {
  name: "Download",
  description: "Open file in a new tab to download it",
  loader: async (file) => {
    if (!file) return console.log(file);

    DownloadFile(file);
  },
  icon: OpenInNewIcon,
  extensions: [],
};

export default loader;
