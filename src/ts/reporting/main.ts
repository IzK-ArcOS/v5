import PocketBase from "pocketbase";
import { get } from "svelte/store";
import { getServer } from "../api/server";
import { compileStringLog } from "../console/collector";
import { ArcOSVersion } from "../env/main";
import { UserData, UserName } from "../userlogic/interfaces";
import {
  defaultReportOptions,
  type ReportOptions,
  type ReportRecord,
} from "./interface";

const pb = new PocketBase("https://pb.arcapi.nl/");

export async function sendReport(
  options: ReportOptions = defaultReportOptions
) {
  return await pb
    .collection("bugrep")
    .create<ReportRecord>(createReport(options));
}

export function createReport(options: ReportOptions = defaultReportOptions) {
  return {
    author: get(UserName),
    body: options.body,
    version: ArcOSVersion,
    log: options.includeLog ? compileStringLog().join("\n") : "",
    userdata: options.includeUserData ? get(UserData) : null,
    api: options.includeApi ? getServer() : null,
  };
}

export async function getReport(id: string) {
  return await pb.collection("bugrep").getOne<ReportRecord>(id);
}
