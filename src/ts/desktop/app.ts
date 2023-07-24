export let DESKTOP_MODE: "desktop" | "browser";

export async function getDesktopMode() {
  try {
    const req = await (await fetch("./desktop")).text();

    DESKTOP_MODE = req.includes("desktop") ? "desktop" : "browser";

    console.log(DESKTOP_MODE);
  } catch {
    DESKTOP_MODE = "browser";
  }
}

export const isDesktop = () => DESKTOP_MODE == "desktop";
