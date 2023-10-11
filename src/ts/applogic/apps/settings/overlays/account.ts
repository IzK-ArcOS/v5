import ChangePassword from "../../../../../lib/Apps/Settings/Pages/Account/Overlays/ChangePassword.svelte";
import ChangeUsername from "../../../../../lib/Apps/Settings/Pages/Account/Overlays/ChangeUsername.svelte";
import UserDataExplorer from "../../../../../lib/Page/Desktop/UserDataExplorer.svelte";

const AccountPageOverlays = {
  udataExplorer: {
    info: {
      name: "User Data Explorer",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: UserDataExplorer,
    size: { w: 550, h: 400 },
    show: false,
  },
  changePswd: {
    info: {
      name: "Change Password",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: ChangePassword,
    size: { w: 370, h: 195 },
    show: false,
  },
  changeUsername: {
    info: {
      name: "Change Username",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: ChangeUsername,
    size: { w: 370, h: 155 },
    show: false,
  },
};

export default AccountPageOverlays;
