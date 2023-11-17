import { get, writable } from "svelte/store";
import { applyState } from "../state/main";
import type { ReportOptions, Report } from "./interface";
import { createReport, sendReport } from "./main";
import { Log } from "../console";
import { LogLevel } from "../console/interface";

export const CRASHING = writable(false);

const CRASH_BLACKLIST = [
  "NotAllowedError",
  "NotSupportedError",
  "AbortError",
  "AxiosError",
  "ClientResponseError",
];

export const CrashReport = writable<Report>();

export function isBlackListed(test: string) {
  for (let i = 0; i < CRASH_BLACKLIST.length; i++) {
    if (test.includes(CRASH_BLACKLIST[i])) return true;
  }

  return false;
}

export function handleWindowError(
  e: (Event & { currentTarget: EventTarget & Element }) | PromiseRejectionEvent
) {
  if (get(CRASHING))
    return Log(
      "reporting/crash.ts: handleWindowError",
      "Crash prevented because another crash is already in progress!",
      LogLevel.warn
    );

  const error = e as unknown as ErrorEvent;
  const rejection = e as PromiseRejectionEvent;
  const filename = error.filename || rejection.reason.name;
  const position = error.lineno ? `(${error.lineno}:${error.colno})` : "";
  const message = error.message || rejection.reason.message;
  const stack = error.error?.stack || rejection.reason.stack;

  if (
    (rejection && rejection.reason && isBlackListed(rejection.reason.name)) ||
    (message && message.includes("dynamically imported module"))
  )
    return Log(
      "reporting/crash.ts: handleWindowError",
      `Not making a report for ${rejection.reason.name}`,
      LogLevel.warn
    );

  CRASHING.set(true);

  Log("ArcOS", `------(#! [ SYSTEM IS CRASHING ] !#)------`, LogLevel.error);

  const options: ReportOptions = {
    includeUserData: false,
    includeApi: true,
    title: "Svelte:Window auto-generated error",
    body: `File: ${filename} ${position}\n\n${message}\n\n${
      stack || "  at ArcOS (no stack)"
    }`,
  };
  const report = createReport(options);

  CrashReport.set(report);

  Log(`Error: ${filename}`, message, LogLevel.error);

  setTimeout(() => {
    applyState("crash");
  }, 2000);

  if (import.meta.env.DEV)
    return Log(
      "reporting/crash.ts: handleWindowError",
      "Not sending a report in dev env, we ain't spammin' da servers!",
      LogLevel.warn
    );

  sendReport(options);
}

export function manualCrash(source: string, reason: string, stack?: string) {
  Log("ArcOS", `------(#! [ SYSTEM IS CRASHING ] !#)------`, LogLevel.error);
  const options: ReportOptions = {
    includeUserData: false,
    includeApi: true,
    title: reason,
    body: `Source: ${source}\n\n${stack || "  at ArcOS (no stack)"}`,
  };

  const report = createReport(options);

  CrashReport.set(report);

  Log(`Error: ${source}`, reason, LogLevel.error);

  setTimeout(() => {
    applyState("crash");
  }, 2000);

  if (import.meta.env.DEV)
    return Log(
      "reporting/crash.ts: manualCrash",
      "Not sending a report in dev env, we ain't spammin' da servers!",
      LogLevel.warn
    );

  sendReport(options);
}
