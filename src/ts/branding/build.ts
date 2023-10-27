import { Log } from "../console";

export let ARCOS_BUILD = "unknown";

export async function getBuild() {
  Log(
    "ts/branding/build.ts: getBuild",
    "Attempting to retrieve git hash from /build"
  );

  try {
    const req = await (await fetch("./build")).text();
    const str = req.split("\n")[0].trim();

    ARCOS_BUILD = str.startsWith("<!") ? "unknown" : str;
  } catch {
    ARCOS_BUILD = "unknown";
  }
}
