import { get } from "svelte/store";
import { getFSQuota } from "../api/fs/quota";
import { formatBytes } from "../api/fs/sizes";
import { UserName } from "../userlogic/interfaces";
import type { ArcTerm } from "./main";

export async function arcTermModeIntro(a: ArcTerm) {
  const aapi = localStorage.getItem("arcos-server");
  const user = get(UserName);
  const q = await getFSQuota();
  const used = formatBytes(q.used);
  const max = formatBytes(q.max);
  const perc = ((100 / q.max) * q.used).toFixed(2);

  a.util.writeColor(
    "[█] You are currently in [ArcTerm mode].\n[█] Commands that require the ArcOS desktop have been disabled.",
    "orange"
  );

  a.util.writeColor(`\nAuthenticated as [${user}] at [${aapi}]\n`, "aqua");

  a.util.writeColor(
    `\n[ArcFS]: You are using [${used}] of [${max}] total (${perc}%)`,
    "yellow"
  );

  a.util.writeLine("\n");
}
