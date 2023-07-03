import { get } from "svelte/store";
import { closeProcess } from "../../applogic/events";
import { ProcessStore } from "../../applogic/store";
import type { Command } from "../interface";

export const Kill: Command = {
  keyword: "kill",
  exec(cmd, argv, term) {
    const processId = parseInt(argv[0]);

    if (!processId) return term.std.Error("Missing or invalid PID.");

    const process = get(ProcessStore)[processId];

    if (!process) return term.std.Error(`${processId}: prcoess not found.`);

    closeProcess(processId);

    term.std.writeLine(`Closed ${process.app.info.name}`);
  },
  description: "Terminate a process",
  syntax: `"<[PID]>"`,
};
