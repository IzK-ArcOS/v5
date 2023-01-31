import { errorMessage } from "../../errorlogic/main";
import type { ArcFile } from "../interface";
import type { ExternalAppLoaderContent } from "./interface";

export function loadExternalApp(info: ExternalAppLoaderContent) {
  const styleTag = document.createElement("style");
  const scriptTag = document.createElement("script");

  scriptTag.id = `hotLoaderJS_${info.id}`;
  styleTag.id = `hotLoaderCSS_${info.id}`;

  styleTag.textContent = info.css;
  scriptTag.textContent = info.js.replace(".$$.root", "");

  if (
    !info.meta ||
    !info.meta.author ||
    !info.meta.name ||
    !info.meta.version ||
    info.meta.version.split(".")[0] == "0"
  )
    return;

  document.body.append(scriptTag, styleTag);
}

export function loadAppFile(data: ArcFile) {
  const text = String.fromCharCode.apply(
    null,
    new Uint8Array(data.data)
  ) as string;

  console.log(text);

  let json: ExternalAppLoaderContent;

  try {
    json = JSON.parse(text);
  } catch {
    errorMessage(
      "Unable to load app from file",
      "The imported file could not be parsed as a valid JSON object.",
      null,
      null,
      { caption: "OK", action() {} }
    );
    return false;
  }

  loadExternalApp(json);
}
