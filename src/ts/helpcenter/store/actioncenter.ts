import NotImplemented from "../../../lib/HelpCenter/NotImplemented.svelte";
import type { HelpCenterStore } from "../interface";

export default {
  actionCenter: {
    title: "Action Center",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    sep: true,
  },
  actionCenterNotifications: {
    title: "Notifications",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "actionCenter",
  },
  actionCenterQuickActions: {
    title: "Quick Actions",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "actionCenter",
  },
} as HelpCenterStore;
