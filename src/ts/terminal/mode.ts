import { get } from "svelte/store";
import { getFSQuota } from "../api/fs/quota";
import { formatBytes } from "../api/fs/sizes";
import { apiCall, ConnectedServer } from "../api/main";
import { UserName } from "../userlogic/interfaces";
import type { ArcTerm } from "./main";

export async function arcTermModeIntro(a: ArcTerm) {
  const aapi = localStorage.getItem("arcos-server");
  const user = get(UserName);

  a.util.writeLine("Getting FS Quota...");

  const quot = await getFSQuota();
  const used = formatBytes(quot.used);
  const maxs = formatBytes(quot.max);
  const perc = ((100 / quot.max) * quot.used).toFixed(2);

  a.util.writeLine("Getting server information...");

  const conn = await apiCall(get(ConnectedServer), "connect", {});

  const plat = conn.platform;

  a.target.innerText = "";

  a.util.writeColor(
    "[█] You are currently in [ArcTerm mode].\n[█] Commands that require the ArcOS desktop have been disabled.",
    "orange"
  );

  a.util.writeColor(
    `\nAuthenticated as [${user}] at [${plat}] `,
    "aqua",
    "white",
    true
  );

  a.util.writeColor(`[(${aapi})]`, "gray", "white", true);

  a.util.writeColor(
    `\n[ArcFS]: You are using [${used}] of [${maxs}] total (${perc}%)\n`,
    "yellow"
  );
}
