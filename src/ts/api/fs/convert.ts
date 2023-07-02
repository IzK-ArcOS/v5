import type { ArcFile, PartialArcFile } from "../interface";
import { readFile } from "./file";

export async function partialFileToComplete(file: PartialArcFile) {
  const data: ArcFile = {
    name: file.filename,
    path: file.scopedPath,
    mime: file.mime,
    data: (await readFile(file.scopedPath)) as ArrayBuffer,
  };

  return data;
}

export async function fileToArcFile(file: File, target: string, mime?: string) {
  const data: ArcFile = {
    name: file.name,
    path: target,
    data: await file.arrayBuffer(),
    mime: mime || "ArcOS Uploadable",
  };

  return data;
}
