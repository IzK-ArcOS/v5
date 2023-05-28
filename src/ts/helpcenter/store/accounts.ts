import NotImplemented from "../../../lib/HelpCenter/NotImplemented.svelte";
import type { HelpCenterStore } from "../interface";

export default {
  accounts: {
    title: "Accounts",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    sep: true,
  },
  accountsChangeCred: {
    title: "Changing my Credentials",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "accounts",
  },
  accountsChangeProfile: {
    title: "Changing my Profile Picture",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "accounts",
  },
  accountsDelete: {
    title: "Deleting my Account",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "accounts",
  },
} as HelpCenterStore;
