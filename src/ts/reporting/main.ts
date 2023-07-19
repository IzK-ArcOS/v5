import PocketBase from "pocketbase";
import { get } from "svelte/store";
import { getServer } from "../api/server";
import { compileStringLog } from "../console/collector";
import { ArcOSVersion } from "../env/main";
import { UserData, UserName } from "../userlogic/interfaces";
import {
  defaultReportOptions,
  LocalReportData,
  Report,
  type ReportOptions,
  type ReportRecord,
} from "./interface";
import { getAppPreference, setAppPreference } from "../applogic/pref";
import { makeNotification } from "../notiflogic/main";
import bugRepIcon from "../../assets/apps/error.svg";
import { removeApiSensitive } from "./obfuscate";

const pb = new PocketBase("https://pb.arcapi.nl/");

export async function sendReport(
  options: ReportOptions = defaultReportOptions
) {
  const report = createReport(options);
  const id = (await pb.collection("bugrep").create<ReportRecord>(report)).id;

  if (report.author) {
    const reports =
      (getAppPreference("Reporting", "reports") as LocalReportData[]) || [];

    reports.push({ id, timestamp: new Date().getTime() });

    setAppPreference("Reporting", "reports", reports);

    makeNotification({
      title: "Bug Reported",
      message: `Bug Report ${id} has been sent to ArcOS. You can view the sent data at any time in Settings.`,
      buttons: [{ caption: "Show", action() {} }],
      image: bugRepIcon,
    });
  }

  return id;
}

export function createReport(
  options: ReportOptions = defaultReportOptions
): Report {
  const rnd = () => Math.floor(Math.random() * 1e6);

  return {
    author: get(UserName),
    body: options.body,
    version: ArcOSVersion,
    log: removeApiSensitive(compileStringLog().join("\n")),
    userdata: options.includeUserData ? get(UserData) : null,
    api: options.includeApi ? getServer() : null,
    issueid: `${rnd()}-${rnd()}-${rnd()}-${rnd()}`,
  };
}

export async function getReport(id: string) {
  try {
    return await pb
      .collection("bugrep")
      .getOne<ReportRecord>(id, { $autoCancel: false });
  } catch {
    return null;
  }
}

export async function reportExists(id: string) {
  return !!(await getReport(id));
}
