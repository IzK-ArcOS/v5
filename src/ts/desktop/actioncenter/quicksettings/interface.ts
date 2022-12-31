import type { UserData } from "../../../userlogic/interfaces";

export interface QuickSetting {
  icon: string;
  iconOff: string;
  caption: string;
  setter: (userdata: UserData) => boolean;
  getter: (userdata: UserData) => boolean;
}
