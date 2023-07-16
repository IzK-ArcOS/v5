import { writable } from "svelte/store";
import { applyState } from "./state/main";
import type { BugReport } from "./bugrep/interface";
import { Log } from "./console";
import { LogLevel } from "./console/interface";

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

  Log(
    `applyState for ${stateSource}`,
    `Can't apply a non-existent state '${stateKey}'.`,
    LogLevel.warn
  );
}
