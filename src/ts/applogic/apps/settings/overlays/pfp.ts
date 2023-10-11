import CustomProfilePicture from "../../../../../lib/Apps/Settings/Pages/Account/Overlays/CustomProfilePicture.svelte";
import ProfilePictureView from "../../../../../lib/Apps/Settings/Pages/Account/Overlays/ProfilePictureView.svelte";
import ProfilePicture from "../../../../../lib/ProfilePicture.svelte";

const ProfilePictureOverlays = {
  pfpSel: {
    info: {
      name: "Profile Picture Selector",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: ProfilePicture,
    size: { w: 382, h: 410 },
    show: false,
  },
  customPfp: {
    info: {
      name: "Custom Profile Picture",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: CustomProfilePicture,
    size: { w: 350, h: 125 },
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
