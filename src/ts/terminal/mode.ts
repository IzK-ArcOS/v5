import { get } from "svelte/store";
import { getFSQuota } from "../api/fs/quota";
import { formatBytes } from "../api/fs/sizes";
import { apiCall, ConnectedServer } from "../api/main";
import sleep from "../sleep";
import { UserName } from "../userlogic/interfaces";
import type { ArcTerm } from "./main";

export async function arcTermModeIntro(a: ArcTerm) {
  a.util.writeColor(`[1/4]: Starting ArcTerm Mode...`, "gray");

  await sleep(100);

  const aapi = localStorage.getItem("arcos-server");
  const user = get(UserName);

  a.util.writeColor("[2/4]: Getting Filesystem Quota...", "gray");

  const quot = await getFSQuota();
  const used = formatBytes(quot.used);
  const maxs = formatBytes(quot.max);
  const perc = ((100 / quot.max) * quot.used).toFixed(2);

  a.util.writeColor("[3/4]: Getting server information...", "gray");

  const conn = await apiCall(get(ConnectedServer), "connect", {});
  const plat = conn.platform;

  a.util.writeColor("[4/4]: Starting input cycle...\n\n", "gray");

  const e = Object.entries({ aapi, user, quot, used, maxs, perc, conn, plat });

  await vardisp(a, e);

  disclaimer(a);
  auth(a, user, plat);
  api(a, aapi);
  usage(a, used, maxs, perc);
}

async function vardisp(a: ArcTerm, e: [string, any][]) {
  for (let i = 0; i < e.length; i++) {
    await sleep(25);

    a.util.writeColor(
      `Using: ${i} -> [${e[i][0]}] = ${JSON.stringify(e[i][1])}`,
      "purple"
    );
  }

  await sleep(1000);
}

function disclaimer(a: ArcTerm) {
  a.util.clear();

  a.util.writeColor(
    `[█] You are currently in [ArcTerm mode].\n[█] Commands that require the ArcOS desktop have been disabled.\n\n`,
    "orange"
  );

  a.util.writeColor(`ArcTerm reference ID: [${a.referenceId}]`, "blue");
}

function auth(a: ArcTerm, user: string, plat: string) {
  a.util.writeColor(
    `\nAuthenticated as [${user}] at [${plat}]`,
    "aqua",
    "white",
    true
  );
}

function api(a: ArcTerm, aapi: string) {
  a.util.writeColor(` [(${aapi})]`, "gray", "white", true);
}

function usage(a: ArcTerm, used: string, max: string, percent: string) {
  a.util.writeColor(
    `\n[ArcFS]: You are using [${used}] of [${max}] total (${percent}%)\n`,
    "yellow"
  );
}
