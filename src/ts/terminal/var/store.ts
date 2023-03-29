import { get } from "svelte/store";
import { getDirectory } from "../../api/fs/directory";
import { Log, LogLevel } from "../../console";
import { ArcOSVersion } from "../../env/main";
import { UserName } from "../../userlogic/interfaces";
import { Color, colors, VariableStore } from "../interface";
import type { ArcTerm } from "../main";

export function getArcTermStore(term: ArcTerm): VariableStore {
  Log({
    source: `ArcTerm ${term.referenceId}`,
    msg: "Getting ArcTerm variable store",
    level: LogLevel.info,
  });
  return {
    prompt: {
      get: () => term.env.prompt,
      set: async (v) => {
        term.env.prompt = v;

        await term.env.config.writeConfig();
      },

      readOnly: false,
    },
    server: {
      get: () => localStorage.getItem("arcos-server"),
      readOnly: true,
    },
    username: {
      get: () => get(UserName),
      readOnly: true,
    },
    version: {
      get: () => ArcOSVersion,
      readOnly: true,
    },
    pwd: {
      get: () => term.path,
      set: async (v) => {
        const dir = await getDirectory(v);

        if (!dir)
          return term.std.Error(`pwd: Directory doesn't exist, falling back.`);

        term.path = v;
      },
      readOnly: false,
    },
    color: {
      get: () => term.env.promptColor,
      set: async (v) => {
        if (!colors.includes(v))
          return term.std.Error("color is invalid, falling back.");

        term.env.promptColor = v as Color;

        await term.env.config.writeConfig();

        term.util.flushAccent();
      },
      readOnly: false,
    },
    ref: {
      get: () => term.referenceId,

      readOnly: true,
    },
  };
}
