export let ARCOS_BUILD = "unknown";

export async function getBuild() {
  try {
    const req = await (await fetch("./build")).text();

    ARCOS_BUILD = req.split("\n")[0].trim();
  } catch {
    ARCOS_BUILD = "unknown";
  }
}
