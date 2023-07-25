import { writable } from "svelte/store";
import { applyState } from "../state/main";
import type { ReportOptions, Report } from "./interface";
import { createReport, sendReport } from "./main";
import { Log } from "../console";
import { LogLevel } from "../console/interface";

const CRASH_BLACKLIST = ["NotAllowedError"];

export const CrashReport = writable<Report>();

export function handleWindowError(
  e: (Event & { currentTarget: EventTarget & Element }) | PromiseRejectionEvent
) {
  const error = e as unknown as ErrorEvent;
  const rejection = e as PromiseRejectionEvent;

  if (rejection && CRASH_BLACKLIST.includes(rejection.reason.name))
    return Log(
      "reporting/window.ts: handleWindowError",
      `Not making a report for ${rejection.reason.name}`,
      LogLevel.warn
    );

  const filename = error.filename || rejection.reason.name;
  const position = error.lineno ? `(${error.lineno}:${error.colno})` : "";
  const message = error.message || rejection.reason.message;
  const stack = error.error?.stack || rejection.reason.stack;

  const options: ReportOptions = {
    includeUserData: true,
    includeApi: true,
    title: "Svelte:Window auto-generated error",
    body: `File: ${filename} ${position}\n\n${message}\n${stack}`,
  };
  const report = createReport(options);

  CrashReport.set(report);

  setTimeout(() => {
    applyState("crash");
  }, 1500);

  if (import.meta.env.DEV)
    return Log(
      "reporting/window.ts: handleWindowError",
      "Not sending a report in dev env, we ain't spammin' da servers!",
      LogLevel.warn
    );

  sendReport(options);
}
