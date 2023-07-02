import file from "../../../../assets/mimetypes/application-default.svg";
import { extensionIcons } from "./store";

export function getMimeIcon(filename: string) {
  for (let i = 0; i < extensionIcons.length; i++) {
    const exts = extensionIcons[i].extensions;

    for (let j = 0; j < exts.length; j++) {
      if (filename.endsWith(exts[j])) return extensionIcons[i].image;
    }
  }

  return file;
}
