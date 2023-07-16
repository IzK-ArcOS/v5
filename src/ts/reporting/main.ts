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
import { getAppPreference, setAppPreference } from "../applogic/pref";
import { makeNotification } from "../notiflogic/main";
import bugRepIcon from "../../assets/apps/error.svg";

const pb = new PocketBase("https://pb.arcapi.nl/");

export async function sendReport(
  options: ReportOptions = defaultReportOptions
) {
  const report = createReport(options);
  const id = (await pb.collection("bugrep").create<ReportRecord>(report)).id;

  if (report.author) {
    const reports =
      (getAppPreference("Reporting", "reports") as string[]) || [];

    reports.push(id);

    setAppPreference("Reporting", "reports", reports);

    makeNotification({
      title: "Bug Reported",
      message: `Bug Report ${id} has been sent to ArcOS. You can view the sent data at any time in Settings.`,
      buttons: [{ caption: "Show", action() {} }],
      image: bugRepIcon,
    });
  }
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
