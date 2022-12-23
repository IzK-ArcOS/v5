import { writable } from "svelte/store";
import { Log, LogLevel } from "./console";
import { applyState } from "./state/main";

export interface BugReport {
  icon: string;
  title: string;
  message: string;
  details?: string;
  source?: string;
  button?: {
    action: () => void;
    caption: string;
  };
}

export const BugReportData = writable<[boolean, BugReport]>();

export function InvalidStateBugrep(stateSource: string, stateKey: string) {
  BugReportData.set([
    true,
    {
      icon: "broken_image",
      title: `Broken page`,
      message:
        "ArcOS tried to open a page or location that doesn't exist.<br>This session can't continue. You can choose to restart.",
      button: {
        action: () => applyState("boot"),
        caption: "Restart",
      },
      source: stateSource,
      details: `applyState for ${stateSource}: Can't apply a non-existent state '${stateKey}'.`,
    },
  ]);

  Log({
    level: LogLevel.warn,
    source: `applyState for ${stateSource}`,
    msg: `Can't apply a non-existent state '${stateKey}'.`,
  });
}
