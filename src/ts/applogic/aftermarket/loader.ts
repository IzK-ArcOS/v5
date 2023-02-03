import { get } from "svelte/store";
import sd from "../../../assets/handlers/apploader.svg";
import { errorMessage } from "../../errorlogic/main";
import { makeNotification } from "../../notiflogic/main";
import { UserData } from "../../userlogic/interfaces";
import { isLoaded } from "../checks";
import type { ArcFile } from "../interface";
import type { ExternalAppLoaderContent } from "./interface";

export function loadExternalApp(info: ExternalAppLoaderContent) {
  const styleTag = document.createElement("style");
  const scriptTag = document.createElement("script");
  const holder = document.createElement("div");

  holder.id = `SIDELOAD_${Math.floor(Math.random() * 1e4 * Math.PI)}`;

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

  holder.append(scriptTag, styleTag);

  document.body.append(holder);
}

export function loadAppFile(data: ArcFile) {
  const text = String.fromCharCode.apply(
    null,
    new Uint8Array(data.data)
  ) as string;

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

  if (isLoaded(json.id))
    return makeNotification({
      title: "Can't import app",
      message:
        "Another app with the same ID is already loaded. It is not possible to load apps with the same ID.",
      buttons: [],
      timeout: 3000,
      image: sd,
    });

  const u = get(UserData);

  const askPresist = u.askPresist;
  const prContains = u.autoLoads && u.autoLoads.includes(data.path);

  if (askPresist && !prContains)
    makeNotification({
      title: "Always import?",
      message: `Do you want to import application file "${data.name}" every time you log in?`,
      buttons: [
        {
          capt: "Yes",
          action() {
            const udata = get(UserData);

            if (!udata.autoLoads) udata.autoLoads = [];

            udata.autoLoads.push(data.path);

            UserData.set(udata);
          },
        },
        {
          capt: "Don't show again",
          action() {
            const udata = get(UserData);

            udata.askPresist = false;

            UserData.set(udata);
          },
        },
      ],
      image: sd,
    });

  loadExternalApp(json);

  return true;
}
