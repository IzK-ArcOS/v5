import { Log } from "../../console";
import { LogLevel } from "../../console/interface";
import type { ArcFile, PartialArcFile } from "../interface";
import { readFile } from "./file";

export async function partialFileToComplete(file: PartialArcFile) {
  Log(
    "fs/convert.ts: partialFileToComplete",
    `Converting ${file.scopedPath} to ArcFile`,
    LogLevel.info
  );

  const data: ArcFile = {
    name: file.filename,
    path: file.scopedPath,
    mime: file.mime,
    data: (await readFile(file.scopedPath)) as ArrayBuffer,
  };

  return data;
}

export async function fileToArcFile(file: File, target: string, mime?: string) {
  Log(
    "fs/convert.ts: fileToArcFile",
    `Converting ${file.name} to ArcFile`,
    LogLevel.info
  );

  const data: ArcFile = {
    name: file.name,
    path: target,
    data: await file.arrayBuffer(),
    mime: mime || "ArcOS Uploadable",
  };

  return data;
}
