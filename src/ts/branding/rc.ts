import { get } from "svelte/store";
import { CurrentState } from "../state/main";
import { makeNotification } from "../notiflogic/main";
import { ARCOS_MODE, Logo } from "../branding";
import { ArcOSVersion } from "../env/main";
import sleep from "../sleep";

export async function checkReleaseCandidate() {
  if (get(CurrentState).key != "desktop" || ARCOS_MODE != "rc") return;

  await sleep(1000);

  makeNotification({
    title: "Release Candidate",
    message: `You're currently running a release candidate build of ArcOS. This build can and will have unwanted behaviour and bugs. Any critical errors will be reported automatically.<br><br>ArcOS version ${ArcOSVersion}-rc`,
    buttons: [],
    image: Logo(),
    timeout: 3000,
  });
}
