import CustomProfilePicture from "../../../../../lib/Apps/Settings/Pages/Account/Overlays/CustomProfilePicture.svelte";
import ProfilePictureView from "../../../../../lib/Apps/Settings/Pages/Account/Overlays/ProfilePictureView.svelte";
import ProfilePicture from "../../../../../lib/Apps/Settings/Pages/Account/Overlays/ProfilePicture.svelte";

const ProfilePictureOverlays = {
  pfpSel: {
    info: {
      name: "Profile Picture Selector",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: ProfilePicture,
    size: { w: 382, h: 440 },
    show: false,
  },
  customPfp: {
    info: {
      name: "Custom Profile Picture",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: CustomProfilePicture,
    size: { w: 350, h: 140 },
    show: false,
  },
  largePfp: {
    info: {
      name: "View Profile Picture",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: ProfilePictureView,
    size: { w: 320, h: 360 },
    show: false,
  },
};
export default ProfilePictureOverlays;
