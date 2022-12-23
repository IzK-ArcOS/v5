import { BugReportData } from "../bugrep";
import { applyState } from "../state/main";
import type { App } from "./interface";

export function maxSizeExceedsLiteral(app: App) {
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
