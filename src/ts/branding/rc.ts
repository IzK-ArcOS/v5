import { get } from "svelte/store";
import { CurrentState } from "../state/main";
import { makeNotification } from "../notiflogic/main";
import { Logo } from "../branding";
import { ArcOSVersion } from "../env/main";

export function checkReleaseCandidate() {
  if (get(CurrentState).key != "desktop") return;

  makeNotification({
    title: "Release Candidate",
    message: `You're currently running a release candidate build of ArcOS. This build can and will have unwanted behaviour and bugs. Any critical errors will be reported automatically.<br><br>ArcOS version ${ArcOSVersion}-rc`,
    buttons: [],
    image: Logo(),
    timeout: 3000,
  });
}
