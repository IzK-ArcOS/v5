import { get } from "svelte/store";
import { formatBytes } from "../../api/fs/sizes";
import { getDeviceInfo } from "../../device/main";
import { UserName } from "../../userlogic/interfaces";
import type { Color, Command } from "../interface";

export const ArcFetch: Command = {
  keyword: "arcfetch",
  exec(cmd, argv, term) {
    term.util.writeLine("\n");

    const colors = [
      "gray",
      "white",
      "red",
      "orange",
      "yellow",
      "green",
      "aqua",
      "blue",
      "purple",
    ];

    const info = getDeviceInfo();

    const graphicParts = [
      "    _   ",
      "   /_\\  ",
      "  / _ \\ ",
      " /_/ \\_\\",
      "        ",
    ];
    const items = Object.entries({
      Server: localStorage.getItem("arcos-server"),
      Username: get(UserName),
      Processor: `${info.cpu.cores} cores`,
      GPU: `${info.gpu.vendor} ${info.gpu.model}`,
      Memory: `~ ${formatBytes(info.mem.kb)}`,
    });

    for (let i = 0; i < graphicParts.length; i++) {
      term.util.writeColor(`[${graphicParts[i]}]  `, "blue", "white", true);

      if (items[i]) {
        term.util.writeColor(
          `[${items[i][0].padEnd(12, " ")}]: ${items[i][1]}`,
          "purple",
          "white",
          true
        );
      }

      term.util.writeLine("");
    }

    term.util.write("\n                        ");

    for (let i = 0; i < colors.length; i++) {
      term.util.writeColor("[██]", colors[i] as Color, "white", true);
    }

    term.util.writeLine("");
  },
  description: "Show system information",
};
