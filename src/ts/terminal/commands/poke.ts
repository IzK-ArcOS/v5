import { get } from "svelte/store";
import { isLoaded } from "../../applogic/checks";
import { WindowStore } from "../../applogic/store";
import { getJsonHierarchy, setJsonHierarchy } from "../../hierarchy";
import type { Command } from "../interface";

const BANNED = [
  "content",
  "disabled",
  "opened",
  "parentId",
  "snapped",
  "fileMimes",
  "fileExts",
  "id",
  "overlays",
  "errorOverlays",
  "disabledWarning",
  "events",
];

export const Poke: Command = {
  keyword: "poke",
  exec(cmd, argv, term) {
    if (!argv.length || argv.length < 3)
      return term.std.Error("Missing arguments");

    const appId = argv[0];
    const hierarchy = argv[1];

    if (!isLoaded(appId))
      return term.std.Error(
        `Can't change property of [${appId}]: App not loaded!`
      );

    if (!hierarchy) return term.std.Error("Missing hierarchy");

    // Make it a little more safe
    if (BANNED.join("|").includes(hierarchy))
      return term.std.Error(
        `Not permitted to change property [${hierarchy}] of [${appId}]`
      );

    const ws = get(WindowStore);

    const window = ws.filter((a) => a.id == appId)[0];

    const currentValue = getJsonHierarchy(window, hierarchy);

    if (!currentValue && typeof currentValue === "undefined")
      return term.std.Error(`Can't find [UserData.${hierarchy}]!`);

    argv.shift(); // Remove the app ID from the arguments
    argv.shift(); // Remove the hierarchy from the arguments

    let newValue = argv.join(" ").trim();

    try {
      newValue = JSON.parse(newValue);
    } catch {
      // silently error
    }

    setJsonHierarchy(window, hierarchy, newValue);

    for (let i = 0; i < ws.length; i++) {
      if (ws[i].id == appId) ws[i] = window;
    }

    WindowStore.set(ws);

    term.std.writeColor(`Updated [WindowStore.${appId}.${hierarchy}]`, "blue");
  },
  description: "Poke app properties",
};
