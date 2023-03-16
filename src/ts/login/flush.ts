import { DevModeOverride } from "../devmode/props";
import { ErrorMessages } from "../errorlogic/app";
import { NotificationStore } from "../notiflogic/main";
import { UserName } from "../userlogic/interfaces";
import { loginUsername } from "./main";

export default function () {
  UserName.set(undefined);
  loginUsername.set(undefined);
  NotificationStore.set({});
  ErrorMessages.set([]);
  DevModeOverride.set(false);
}
