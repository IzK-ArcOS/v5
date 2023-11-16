import type { ArcFile } from "../interface";
import { arrayToBlob } from "./file/conversion";

export function DownloadFile(file: ArcFile) {
  const blob = arrayToBlob(file.data, file.mime.split(";")[0]);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = file.name;
  anchor.target = "_blank";
  anchor.click();
  anchor.remove();
}
