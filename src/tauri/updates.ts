import { ArcOSVersion } from "../ts/env/main";
import { makeNotification } from "../ts/notiflogic/main";

export async function getLatestRelease(): Promise<GitHubRelease> {
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
  return tn.split("-")[0];
}

export function versionBigger(a: Version, b: Version) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] > b[i]) return true;
  }

  return false;
}

export async function checkForUpdates() {
  /* if (!(await inTauri())) return; */

  const release = await getLatestVersion();

  if (versionBigger(release, parseVersion(ArcOSVersion))) {
    const version = `v${release.join(".")}`;
    const RELEASE_URL =
      "https://github.com/IzK-ArcOS/ArcOS-Frontend/releases/latest";

    makeNotification({
      icon: "sync",
      title: "Updates available!",
      message: `ArcOS Desktop ${version} is available for download. Install it to get the latest features.`,
      buttons: [
        {
          caption: "Open",
          action: () => window.open(RELEASE_URL, "_blank"),
        },
      ],
    });
  }
}
