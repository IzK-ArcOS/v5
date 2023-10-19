import { writable } from "svelte/store";
import { fbClass, fbState } from "../applogic/apps/FileBrowser/main";
import { fileToArcFile } from "./fs/convert";
import { writeFile } from "./fs/file";
import { Log } from "../console";
import { LogLevel } from "../console/interface";
import { arrayToBlob } from "./fs/file/conversion";

export async function directSingleUpload(
  path: string,
  accept?: string
): Promise<string> {
  Log(
    "ts/api/upload.ts: directSingleUpload",
    `${path}: (${accept || "no accept"})`,
    LogLevel.info
  );

  if (path.endsWith("/")) path.slice(0, -1);
  const uploader = document.createElement("input");

  uploader.type = "file";
  uploader.accept = accept;

  const target = writable<string>();

  uploader.onchange = async () => {
    const files = uploader.files;

    if (!files.length) target.set("");

    const file = uploader.files[0];

    target.set(await fileUpload(file, path));
  };

  uploader.click();

  return new Promise<string>((resolve) => {
    target.subscribe((v) => {
      if (!v) return;

      resolve(v);
    });
  });
}

async function fileUpload(file: File, dir: string): Promise<string> {
  Log(
    "ts/api/upload.ts: fileUpload",
    `Uploading ${file.name} to ${dir}`,
    LogLevel.info
  );

  const content = arrayToBlob(await file.arrayBuffer());
  const path = `${dir}/${file.name}`.split("//").join("/");

  const data = await fileToArcFile(file, path);

  fbState.update((v) => {
    v.uploadFile = data;

    return v;
  });

  const valid = await writeFile(path, content);

  fbClass.refresh();

  if (!valid) return "";

  return path;
}
