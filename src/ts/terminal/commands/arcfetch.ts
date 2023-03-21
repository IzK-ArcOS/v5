import { get } from "svelte/store";
import { formatBytes } from "../../api/fs/sizes";
import { getDeviceInfo } from "../../device/main";
import { UserName } from "../../userlogic/interfaces";
import type { Color, Command } from "../interface";
import type { ArcTerm } from "../main";

export const ArcFetch: Command = {
  keyword: "arcfetch",
  exec(cmd, argv, term) {
    term.util.writeLine("\n");

    graphic(term);

    term.util.writeLine("");

    colorBar(term);
  },
  description: "Show system information",
};

function getItems() {
  const info = getDeviceInfo();

  return Object.entries({
    Server: localStorage.getItem("arcos-server"),
    Username: get(UserName),
    Processor: `${info.cpu.cores} cores`,
    GPU: `${info.gpu.vendor} ${info.gpu.model}`,
    Memory: `~ ${formatBytes(info.mem.kb)}`,
  });
}

function colorBar(term: ArcTerm) {
  const colors = "red,orange,yellow,green,aqua,blue,purple".split(",");

  term.util.write("\n                        ");

  for (let i = 0; i < colors.length; i++) {
    term.util.writeColor("[██ ]", colors[i] as Color, "white", true);
  }
}

function graphic(term: ArcTerm) {
  const items = getItems();

  const graphicParts = [
    "    _   ",
    "   /_\\  ",
    "  / _ \\ ",
    " /_/ \\_\\",
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
