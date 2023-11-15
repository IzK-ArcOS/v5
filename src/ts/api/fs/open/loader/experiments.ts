import { openWindow } from "../../../../applogic/events";
import { UpdateIcon } from "../../../../icon/general";
import type { UserFileLoader } from "../../../interface";

const loader: UserFileLoader = {
  name: "Experiments",
  description: "Spooky spooky experiments",
  extensions: [".experiments"],
  icon: UpdateIcon,
  loader: () => {
    openWindow("ExperimentsApp");
  },
};

export default loader;
