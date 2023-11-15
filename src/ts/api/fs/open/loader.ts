import type { UserFileLoader } from "../../interface";
import appmod from "./loader/appmod";
import download from "./loader/download";
import edit from "./loader/edit";
import experiments from "./loader/experiments";
import loadtheme from "./loader/loadtheme";
import pdf from "./loader/pdf";

export const FileLoaders: { [key: string]: UserFileLoader } = {
  appmod,
  download,
  edit,
  experiments,
  loadtheme,
  pdf,
};
