import { get } from "svelte/store";
import { getFSQuota } from "../api/fs/quota";
import { formatBytes } from "../api/fs/sizes";
import { apiCall, ConnectedServer } from "../api/main";
import { UserName } from "../userlogic/interfaces";
import type { ArcTerm } from "./main";
import { authPrompt } from "./mode/auth";
import { getServer } from "../api/server";

export async function arcTermModeIntro(a: ArcTerm) {
  if (!(await authPrompt(a))) return;

  const aapi = getServer();
  const user = get(UserName);
  const quot = await getFSQuota();
  const used = formatBytes(quot.used);
  const maxs = formatBytes(quot.max);
  const perc = ((100 / quot.max) * quot.used).toFixed(2);
  const conn = await apiCall(get(ConnectedServer), "connect", {});
  const plat = conn.platform;

  disclaimer(a);
  auth(a, user, plat);
  api(a, aapi);
  usage(a, used, maxs, perc);
}

function disclaimer(a: ArcTerm) {
  a.std.clear();

  a.std.writeColor(
    `[█] You are currently in [ArcTerm mode].\n[█] Commands that require the ArcOS desktop have been disabled.\n\n`,
    "orange"
  );

  a.std.writeColor(`ArcTerm reference ID: [${a.referenceId}]`, "blue");
}

function auth(a: ArcTerm, user: string, plat: string) {
  a.std.writeColor(
    `\nAuthenticated as [${user}] at [${plat}]`,
    "aqua",
    "white",
    true
  );
}

function api(a: ArcTerm, aapi: string) {
  a.std.writeColor(` [(${aapi})]`, "gray", "white", true);
}

function usage(a: ArcTerm, used: string, max: string, percent: string) {
  a.std.writeColor(
    `\n[ArcFS]: You are using [${used}] of [${max}] total (${percent}%)\n`,
    "yellow"
  );
}
