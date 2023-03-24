import { get } from "svelte/store";
import { formatBytes } from "../../api/fs/sizes";
import { getDeviceInfo } from "../../device/main";
import { CurrentState } from "../../state/main";
import { inTauri } from "../../tauri";
import { UserName } from "../../userlogic/interfaces";
import type { Color, Command } from "../interface";
import type { ArcTerm } from "../main";

export const ArcFetch: Command = {
  keyword: "arcfetch",
  async exec(cmd, argv, term) {
    term.util.writeLine("\n");

    await graphic(term);

    term.util.writeLine("");

    colorBar(term);
  },
  description: "Show system information",
};

async function getItems() {
  const info = getDeviceInfo();

  const tauri = await inTauri();

  return Object.entries({
    Server: localStorage.getItem("arcos-server"),
    Username: get(UserName),
    Processor: `${info.cpu.cores} cores`,
    GPU: `${info.gpu.vendor} ${info.gpu.model}`,
    Memory: `~ ${formatBytes(info.mem.kb)}`,
    Mode: (tauri ? `Desktop` : `Browser`) + ` (state ${get(CurrentState).key})`,
  });
}

function colorBar(term: ArcTerm) {
  const colors = "red,orange,yellow,green,aqua,blue,purple".split(",");

  term.util.write("\n                        ");

  for (let i = 0; i < colors.length; i++) {
    term.util.writeColor("[██ ]", colors[i] as Color, "white", true);
  }
}

async function graphic(term: ArcTerm) {
  const items = await getItems();

  const graphicParts = [
    "    _   ",
    "   /_\\  ",
    "  / _ \\ ",
    " /_/ \\_\\",
    "        ",
    "        ",
  ];

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
}
