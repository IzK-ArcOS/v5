import NotImplemented from "../../../lib/HelpCenter/NotImplemented.svelte";
import type { HelpCenterStore } from "../interface";

export default {
  arcfs: {
    title: "ArcFS",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    sep: true,
  },
  arcfsUploading: {
    title: "Uploading Files",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "arcfs",
  },
  arcfsDownloading: {
    title: "Downloading Files",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "arcfs",
  },
  arcfsOpenWith: {
    title: "Open With",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "arcfs",
  },
  arcfsLimitations: {
    title: "Limitations",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "arcfs",
  },
  arcfsQuota: {
    title: "ArcFS Quota",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "arcfs",
  },
} as HelpCenterStore;
