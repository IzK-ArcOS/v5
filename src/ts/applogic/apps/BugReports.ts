import logo from "../../../assets/apps/bugreports.svg";
import BugReportsSvelte from "../../../lib/Apps/BugReports.svelte";
import CreateReport from "../../../lib/Apps/BugReports/Overlays/CreateReport.svelte";
import SystemLog from "../../../lib/Apps/BugReports/Overlays/SystemLog.svelte";
import UserData from "../../../lib/Apps/BugReports/Overlays/UserData.svelte";
import type { App } from "../interface";
import { BugReportsRuntime } from "./BugReports/runtime";

export const BugReports: App = {
  info: {
    name: "Bug Reports",
    description: "View and manage your bug reports",
    builtin: true,
    version: "1.0.0",
    author: "ArcOS Team",
    icon: logo,
    appGroup: "support",
  },
  size: { w: 750, h: 500 },
  pos: { x: 30, y: 40 },
  minSize: { w: 750, h: 500 },
  maxSize: { w: 900, h: 700 },
  controls: { min: true, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: BugReportsSvelte,
  glass: true,
  runtime: BugReportsRuntime,
  overlays: {
    udataExplorer: {
      info: {
        name: "User Data",
        version: "1.0.0",
        author: "ArcOS Team",
      },
      content: UserData,
      size: { w: 550, h: 400 },
      show: false,
    },
    systemLogView: {
      info: {
        name: "View System Log",
        version: "1.0.0",
        author: "ArcOS Team",
      },
      content: SystemLog,
      size: { w: 700, h: 450 },
      show: false,
    },
    createReport: {
      info: {
        name: "Create Report",
        version: "1.0.0",
        author: "ArcOS Team",
      },
      content: CreateReport,
      size: { w: 550, h: 400 },
      show: false,
    },
  },
};
