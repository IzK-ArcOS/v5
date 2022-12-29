import { openWindow } from "../../events";
import { setSettingsPage, SettingsPages } from "../SettingsApp/main";
import type { Tip } from "./interface";

export const DidYouKnowTips: Tip[] = [
  {
    icon: "image",
    title: "Custom wallpaper",
    content:
      "You can upload your own wallpaper to ArcOS! Open settings and go to the Desktop section.",
    trigger() {
      openWindow("settings");

      for (let i = 0; i < SettingsPages.length; i++) {
        if (SettingsPages[i].name == "Desktop") {
          setSettingsPage(SettingsPages[i]);
        }
      }
    },
  },
  {
    icon: "edit",
    title: "App Poker",
    content:
      'Do you want to mess about with ArcOS apps? Open App Manager and click "Poke" next to any opened app. You can then modify attributes for that app, even ones that were disabled by the developers.',
    trigger() {
      openWindow("AppMan");
    },
  },
  {
    icon: "person",
    title: "Profile Pictures",
    content:
      "You can change your profile picture! Click on your profile picture or username in the start menu and you'll be able to choose from one of the thirty built-in profile pictures.",
    trigger() {
      openWindow("AppMan");
    },
  },
];
