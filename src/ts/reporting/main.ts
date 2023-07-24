import PocketBase from "pocketbase";
import { get } from "svelte/store";
import bugRepIcon from "../../assets/apps/bugreports.svg";
import { getServer } from "../api/server";
import { openWindow } from "../applogic/events";
import { getAppPreference, setAppPreference } from "../applogic/pref";
import { ARCOS_MODE } from "../branding";
import { compileStringLog } from "../console/collector";
import { isDesktop } from "../desktop/app";
import { createTrayIcon, disposeTrayIcon } from "../desktop/tray/main";
import { ArcOSVersion } from "../env/main";
import { UserData, UserName } from "../userlogic/interfaces";
import {
  LocalReportData,
  Report,
  defaultReportOptions,
  type ReportOptions,
  type ReportRecord,
} from "./interface";
import { removeApiSensitive } from "./obfuscate";

const pb = new PocketBase("https://pb.arcapi.nl/");

export async function sendReport(
  options: ReportOptions = defaultReportOptions
) {
  const report = createReport(options);
  const id = (await pb.collection("bugrep").create<ReportRecord>(report)).id;

  if (report.author) saveToUser(id);

  return id;
}

export function saveToUser(id: string) {
  const reports =
    (getAppPreference("Reporting", "reports") as LocalReportData[]) || [];

  reports.push({ id, timestamp: new Date().getTime() });

  setAppPreference("Reporting", "reports", reports);

  const trayId = `br$${id}`;
  const title = `Bug Report ${id} sent to ArcOS`;

  createTrayIcon({
    onOpen() {
      openWindow("BugReports");
      disposeTrayIcon(trayId);
    },
    identifier: trayId,
    image: bugRepIcon,
    title,
  });
}

export function createReport(
  options: ReportOptions = defaultReportOptions
): Report {
  const rnd = () => Math.floor(Math.random() * 1e6);

  const x = {
    author: get(UserName),
    title: options.title,
    body: options.body || "No body",
    version: ArcOSVersion,
    log: removeApiSensitive(compileStringLog().join("\n")),
    userdata: options.includeUserData ? get(UserData) : null,
    api: options.includeApi ? getServer() : null,
    issueid: `${rnd()}-${rnd()}-${rnd()}-${rnd()}`,
    resolved: false,
    closed: false,
    desktop: isDesktop(),
    mode_file: ARCOS_MODE,
    useragent: navigator.userAgent,
    frontend: isDesktop() ? "<desktop>" : location.host,
    location: location,
    metaenv: import.meta.env,
  };

  return x;
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
