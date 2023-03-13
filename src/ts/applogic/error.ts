import { BugReportData } from "../bugrep";
import { Log, LogLevel } from "../console";
import { applyState } from "../state/main";
import type { App } from "./interface";

export function maxSizeExceedsLiteral(app: App) {
  return;

  Log({
    msg: `Can't render <${app.id}>: maximal size is bigger than the literal size.`,
    source: "error.ts: maxSizeExceedsLiteral",
    level: LogLevel.critical,
  });

  BugReportData.set([
    true,
    {
      icon: "screenshot_monitor",
      title: `Unable to render ${app.info.name}`,
      message: `The maximal size exceeds the literal size. This should not be possible.`,
      details: `Can't render <${app.id}>: maximal size is bigger than the literal size.`,
      button: {
        action: () => {
          applyState("boot");
        },
        caption: "New Session",
      },
    },
  ]);
}

export function minSizeExceedsLiteral(app: App) {
  return;

  Log({
    msg: `Can't render <${app.id}>: minimal size is bigger than the literal size.`,
    source: "error.ts: minSizeExceedsLiteral",
    level: LogLevel.critical,
  });

  BugReportData.set([
    true,
    {
      icon: "screenshot_monitor",
      title: `Unable to render ${app.info.name}`,
      message: `The maximal size exceeds the literal size. This should not be possible.`,
      details: `Can't render <${app.id}>: maximal size is bigger than the literal size.`,
      button: {
        action: () => {
          applyState("boot");
        },
        caption: "New Session",
      },
    },
  ]);
}
