import NotImplemented from "../../../../lib/HelpCenter/NotImplemented.svelte";
import type { HelpCenterStore } from "../../interface";

export default {
  arctermConfiguration: {
    title: "Configuration",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "arcterm",
  },
  arctermConfigurationPrompt: {
    title: "Prompt",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "arctermConfiguration",
  },
  arctermConfigurationIntro: {
    title: "Intro",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "arctermConfiguration",
  },
} as HelpCenterStore;
