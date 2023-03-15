import { get } from "svelte/store";
import { ConnectedServer } from "../api/main";
import { BugReportData } from "../bugrep";
import { Log, LogLevel } from "../console";
import { getDeviceInfo } from "../device/main";
import { DevModeOverride } from "../devmode/props";
import { makeNotification } from "../notiflogic/main";
import { applyState } from "../state/main";
import { getFreeSpace } from "../storage/main";
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

    if (getFreeSpace() < 256 && !get(ConnectedServer)) outOfSpace();

    DevModeOverride.set(v.devmode);

    console.log(getDeviceInfo());

    const changed = setUserdata(get(UserName), v);

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

function outOfSpace() {
  makeNotification({
    title: "Out of space",
    message:
      "LocalStorage is running out of free space. Please consider changing your preferences or switching to an ArcAPI.",
    icon: "warning",
    buttons: [],
  });
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
