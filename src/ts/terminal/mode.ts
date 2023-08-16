import { get } from "svelte/store";
import { getFSQuota } from "../api/fs/quota";
import { formatBytes } from "../api/fs/sizes";
import { apiCall, ConnectedServer } from "../api/main";
import { UserName } from "../userlogic/interfaces";
import type { ArcTerm } from "./main";
import { authPrompt } from "./mode/auth";
import { getServer } from "../api/server";
import { Log } from "../console";
import { LogLevel } from "../console/interface";
import { UserCache } from "../userlogic/cache";

export async function arcTermModeIntro(a: ArcTerm) {
  Log(`ArcTerm ${a.referenceId}`, "Viewing ArcTermMode intro", LogLevel.info);

  if (!(await authPrompt(a))) return;

  UserCache.clear();

  const server = getServer();
  const user = get(UserName);
  const quota = await getFSQuota();
  const used = formatBytes(quota.used);
  const max = formatBytes(quota.max);
  const percentage = ((100 / quota.max) * quota.used).toFixed(2);
  const connect = await apiCall(get(ConnectedServer), "connect", {});
  const platform = connect.platform;

  disclaimer(a);
  auth(a, user, platform);
  api(a, server);
  usage(a, used, max, percentage);
}

function disclaimer(term: ArcTerm) {
  term.std.clear();

  term.std.writeColor(
    `[█] You are currently in [ArcTerm mode].\n[█] Commands that require the ArcOS desktop have been disabled.\n\n`,
    "orange"
  );

  term.std.writeColor(`ArcTerm reference ID: [${term.referenceId}]`, "blue");
}

function auth(term: ArcTerm, user: string, platform: string) {
  term.std.writeColor(
    `\nAuthenticated as [${user}] at [${platform}]`,
    "aqua",
    "white",
    true
  );
}

function api(term: ArcTerm, server: string) {
  term.std.writeColor(` [(${server})]`, "gray", "white", true);
}

function usage(term: ArcTerm, used: string, max: string, percent: string) {
  term.std.writeColor(
    `\n[ArcFS]: You are using [${used}] of [${max}] total (${percent}%)\n`,
    "yellow"
  );
}
