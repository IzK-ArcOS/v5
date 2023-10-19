import { get } from "svelte/store";
import { formatBytes } from "../../api/fs/sizes";
import { getServer } from "../../api/server";
import { isDesktop } from "../../desktop/app";
import { getDeviceInfo } from "../../device/main";
import { minArcAPI } from "../../env/main";
import { CurrentState } from "../../state/main";
import { UserName } from "../../userlogic/interfaces";
import { Color, colors, Command } from "../interface";
import type { ArcTerm } from "../main";

export const ArcFetch: Command = {
  keyword: "arcfetch",
  async exec(cmd, argv, term) {
    term.std.writeLine("\n");

    await graphic(term);

    term.std.writeLine("");

    colorBar(term);
  },
  description: "Show system information",
};

async function getItems(a: ArcTerm) {
  const info = getDeviceInfo();

  const desktop = isDesktop();

  return Object.entries({
    Server: `${getServer()} @ rev ${minArcAPI}`,
    Username: get(UserName),
    Processor: `${info.cpu.cores} cores`,
    GPU: `${info.gpu.vendor} ${info.gpu.model}`,
    Memory: `~ ${formatBytes(info.mem.kb)}`,
    Mode: (desktop ? `Desktop` : `Browser`) + ` (state ${CurrentState.key})`,
    Reference: a.referenceId,
  });
}

function colorBar(term: ArcTerm) {
  term.std.write("\n                            ");

  for (let i = 0; i < colors.length; i++) {
    term.std.writeColor("[██ ]", colors[i] as Color, "white", true);
  }
}

async function graphic(term: ArcTerm) {
  const items = await getItems(term);

  const graphicParts = [
    "        ",
    "    _   ",
    "   /_\\  ",
    "  / _ \\ ",
    " /_/ \\_\\",
    "        ",
    "        ",
  ];

  for (let i = 0; i < graphicParts.length; i++) {
    term.std.writeColor(`  [${graphicParts[i]}]    `, "blue", "white", true);

    if (items[i]) {
      term.std.writeColor(
        `[${items[i][0].padEnd(12, " ")}]: ${items[i][1]}`,
        "purple",
        "white",
        true
      );
    }

    term.std.writeLine("");
  }
}
