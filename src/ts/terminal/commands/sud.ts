import { get } from "svelte/store";
import { UserData } from "../../userlogic/interfaces";
import type { Command } from "../interface";
import { getJsonHierarchy, setJsonHierarchy } from "../../hierarchy";

export const SUD: Command = {
  keyword: "sud",
  exec(cmd, argv, term) {
    if (!argv.length || argv.length < 2)
      return term.std.Error("Missing arguments");

    const hierarchy = argv[0];

    if (!hierarchy) return term.std.Error("Missing hierarchy");

    const udata = get(UserData);

    const currentValue = getJsonHierarchy(udata, hierarchy);

    if (!currentValue && typeof currentValue === "undefined")
      return term.std.Error(`Can't find [UserData.${hierarchy}]!`);

    console.log(currentValue, typeof currentValue);

    argv.shift(); // Remove the hierarchy from the arguments

    let newValue = argv.join(" ").trim();

    try {
      newValue = JSON.parse(newValue);
    } catch {
      // silently error
    }

    setJsonHierarchy(udata, hierarchy, newValue);

    UserData.set(udata);

    term.std.writeColor(
      `Wrote ["${newValue}"] to [UserData.${hierarchy}]`,
      "blue"
    );
  },
  description: "",
};
