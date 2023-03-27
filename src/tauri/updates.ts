import { ArcOSVersion } from "../ts/env/main";

export async function getLatestVersion(): Promise<Version> {
  const current = parseVersion(ArcOSVersion);
  try {
    const req = (await (
      await fetch(
        "https://api.github.com/repos/IzK-ArcOS/ArcOS-Frontend/releases/latest",
        { cache: "no-store" }
      )
    ).json()) as GitHubRelease;

    const version = parseVersion(filterTagName(req.tag_name));

    if (versionBigger(version, current)) return version;

    return current;
  } catch {
    return current;
  }
}

export function parseVersion(verStr: string): Version {
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
  return tn.split("-")[0];
}

export function versionBigger(a: Version, b: Version) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] > b[i]) return true;
  }

  return false;
}
