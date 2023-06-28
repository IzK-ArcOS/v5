import { writable } from "svelte/store";
import {
  fbClass,
  FileBrowserUploadFile,
} from "../applogic/apps/FileBrowser/main";
import { writeFile } from "./fs/file";
import type { ArcFile } from "./interface";

export async function directSingleUpload(
  path: string,
  accept?: string
): Promise<string> {
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
  const content = new Blob([new Uint8Array(await file.arrayBuffer())]);
  const path = `${dir}/${file.name}`.split("//").join("/");

  const data: ArcFile = {
    name: file.name,
    path,
    data: await file.arrayBuffer(),
    mime: "ArcOS Uploadable",
  };

  FileBrowserUploadFile.set(data);

  const valid = await writeFile(path, content);

  fbClass.refresh();

  if (!valid) return "";

  return path;
}
