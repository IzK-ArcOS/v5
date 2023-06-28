import { get } from "svelte/store";
import { UserData } from "../../userlogic/interfaces";
import { loadAppFile } from "./loader";
import { readFile } from "../../api/fs/file";
import { errorMessage } from "../../errorlogic/main";
import type { ArcFile } from "../../api/interface";

export async function importAutoLoaders() {
  const udata = get(UserData);

  if (!udata.autoLoads) return false;

  for (let i = 0; i < udata.autoLoads.length; i++) {
    const path = udata.autoLoads[i];

    const file: ArcFile = {
      name: path,
      path,
      mime: "text/plain",
      data: (await readFile(path)) as ArrayBuffer,
    };

    const processed = loadAppFile(file);

    if (!processed || !file.data)
      errorMessage(
        "Can't import app",
        `ArcOS failed to load app file "${path}". Please verify that this file exists and then try again.`,
        null,
        null,
        { caption: "Close", action() {} },
        {
          caption: "Don't load again",
          action() {
            const udata = get(UserData);

            for (let i = 0; i < udata.autoLoads.length; i++) {
              if (udata.autoLoads[i] == path) udata.autoLoads.splice(i, 1);
            }

            UserData.set(udata);
          },
        }
      );
  }
}
