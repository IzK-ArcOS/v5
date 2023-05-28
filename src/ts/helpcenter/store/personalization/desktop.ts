import NotImplemented from "../../../../lib/HelpCenter/NotImplemented.svelte";
import type { HelpCenterStore } from "../../interface";

export default {
  personalizationDesktop: {
    title: "Desktop",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "personalization",
  },
  personalizationDesktopThemes: {
    title: "Themes",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "personalizationDesktop",
  },
  personalizationDesktopCustomThemes: {
    title: "Custom Themes",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "personalizationDesktop",
  },
  personalizationDesktopCustomWallpapers: {
    title: "Custom Wallpapers",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "personalizationDesktop",
  },
} as HelpCenterStore;
