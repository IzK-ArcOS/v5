import { get } from "svelte/store";
import { BugReportData } from "../bugrep";
import { Log } from "../console";
import { applyState } from "../state/main";
import { UserData, UserName } from "./interfaces";
import { committingUserData, setUserdata } from "./main";
import { LogLevel } from "../console/interface";

const source = "UserLogic: UserData watch";

let commitTimeout;

export function commitUserdata(v: UserData) {
  if (!v) return;

  clearTimeout(commitTimeout);

  committingUserData.set(true);

  if (get(UserName)) {
    Log(source, "Change Detected, committing");

    const changed = setUserdata(v);

    unsetStatus();

    if (!changed) {
      Log(source, "Commit failed, setter returned false", LogLevel.error);

      if (!get(BugReportData)) commitFailed();
    }

    return;
  }

  unsetStatus();

  Log(source, "Not committing, no username", LogLevel.warn);
}

function unsetStatus() {
  commitTimeout = setTimeout(() => {
    committingUserData.set(false);
  }, 1500);
}

function commitFailed() {
  BugReportData.set([
    true,
    {
      icon: "person_off",
      title: "User data commit failed",
      message:
        "The user data could not be saved. This happens if the<br>user data is altered while ArcOS is running.",
      details: "UserLogic: UserData watch: setter returned false",
      button: {
        action: () => {
          applyState("fts");
        },
        caption: "Reset",
      },
    },
  ]);
}
