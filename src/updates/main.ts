import { openWindow } from "../ts/applogic/events";
import { DESKTOP_MODE } from "../ts/desktop/app";
import { ArcOSVersion } from "../ts/env/main";

let GITHUB_CACHE: GitHubRelease = null;

export async function getLatestRelease(): Promise<GitHubRelease> {
  if (GITHUB_CACHE) return GITHUB_CACHE;

  try {
    const req = (await (
      await fetch(
        "https://api.github.com/repos/IzK-ArcOS/ArcOS-Frontend/releases/latest",
        { cache: "no-store" }
      )
    ).json()) as GitHubRelease;

    GITHUB_CACHE = req;

    return req;
  } catch {
    return null;
  }
}

export async function getLatestVersion(): Promise<Version> {
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
  const split = verStr.replaceAll("v", "").split(".");

  return [split[0], split[1], split[2]].map((a) => {
    try {
      return parseInt(a);
    } catch {
      return 0;
    }
  }) as Version;
}

export function filterTagName(tn: string) {
  if (!tn) return ArcOSVersion;
  return tn.split("-")[0];
}

export function versionBigger(a: Version, b: Version) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] > b[i]) return true;
  }

  return false;
}

export async function checkForUpdates() {
  if (DESKTOP_MODE !== "desktop") return;

  const release = await getLatestVersion();

  if (versionBigger(release, parseVersion(ArcOSVersion))) {
    openWindow("UpdateNotice");
  }
}
