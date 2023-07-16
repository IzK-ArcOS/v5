import { Log } from "../ts/console";
import { LogLevel } from "../ts/console/interface";
import { ArcOSVersion } from "../ts/env/main";

export async function getLatestRelease(): Promise<GitHubRelease> {
  Log(
    "desktop/updates.ts: getLatestRelease",
    `Contacting GitHub`,
    LogLevel.info
  );

  try {
    const req = (await (
      await fetch(
        "https://api.github.com/repos/IzK-ArcOS/ArcOS-Frontend/releases/latest",
        { cache: "no-store" }
      )
    ).json()) as GitHubRelease;

    return req;
  } catch {
    return null;
  }
}

export async function getLatestVersion(): Promise<Version> {
  Log(
    "desktop/updates.ts: getLatestVersion",
    `Comparing versions`,
    LogLevel.info
  );

  const current = parseVersion(ArcOSVersion);
  try {
    const req = await getLatestRelease();

    if (!req) return current;

    const version = parseVersion(filterTagName(req.tag_name));

    if (versionBigger(version, current)) return version;

    return current;
  } catch {
    return current;
  }
}

export function parseVersion(verStr: string): Version {
  Log(
    "desktop/updates.ts: parseVersion",
    `Parsing Version from ${verStr}`,
    LogLevel.info
  );

  const split = verStr.split(".");

  return [split[0], split[1], split[2]].map((a) => {
    try {
      return parseInt(a);
    } catch {
      return 0;
    }
  }) as Version;
}

export function filterTagName(tn: string) {
  Log("desktop/updates.ts: filterTagName", `Filtering ${tn}`);

  return tn.split("-")[0];
}

export function versionBigger(a: Version, b: Version) {
  Log(
    "desktop/updates.ts: versionBigger",
    `Checking version difference between ${a.join(".")} and ${b.join(".")}`,
    LogLevel.info
  );

  for (let i = 0; i < a.length; i++) {
    if (a[i] > b[i]) return true;
  }

  return false;
}
