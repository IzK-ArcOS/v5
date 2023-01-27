import { errorMessage } from "../../errorlogic/main";
import { makeNotification } from "../../notiflogic/main";
import type { ExternalAppLoaderContent } from "./interface";

export function loadExternalApp(info: ExternalAppLoaderContent) {
  const styleTag = document.createElement("style");
  const scriptTag = document.createElement("script");

  scriptTag.id = `hotLoaderJS_${info.id}`;
  styleTag.id = `hotLoaderCSS_${info.css}`;

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
