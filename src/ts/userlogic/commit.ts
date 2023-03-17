import { get } from "svelte/store";
import { BugReportData } from "../bugrep";
import { Log, LogLevel } from "../console";
import { DevModeOverride } from "../devmode/props";
import { applyState } from "../state/main";
import { UserData, UserName } from "./interfaces";
import { committingUserData, setUserdata } from "./main";

const source = "UserLogic: UserData watch";

let commitTimeout;

export function commitUserdata(v: UserData) {
  clearTimeout(commitTimeout);

  committingUserData.set(true);

  if (get(UserName)) {
    Log({
      level: LogLevel.info,
      msg: "Change Detected, committing",
      source,
    });

    DevModeOverride.set(v.devmode);

    const changed = setUserdata(v);

    unsetStatus();

    if (!changed) {
      Log({
        level: LogLevel.error,
        msg: "Commit failed, setter returned false",
        source,
      });

      if (!get(BugReportData)) commitFailed();
    }

    return;
  }

  unsetStatus();

  Log({
    level: LogLevel.warn,
    msg: "Not committing, no username",
    source,
  });
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
