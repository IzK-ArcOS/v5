import { writable } from "svelte/store";
import type { LocalReportData } from "../../../reporting/interface";
import type { App } from "../../interface";
import { getAppPreference, setAppPreference } from "../../pref";
import { AppRuntime } from "../../runtime/main";
import { LogLevel } from "../../../console/interface";

export class BugReportsRuntime extends AppRuntime {
  public Selected = writable<string>();
  public Store = writable<LocalReportData[]>([]);

  constructor(appData: App) {
    super(appData);

    this.Log("Hi I'm here!");

    this.refreshStore();
  }

  public getReports() {
    this.Log("Getting reports", "getReports");
    return getAppPreference("Reporting", "reports") as LocalReportData[];
  }

  public deleteReport(id: string) {
    this.Log(`Deleting local report ${id}...`, "deleteReport", LogLevel.warn);
    const reports = this.getReports();
    const result = reports.filter((report) => report.id != id);

    setAppPreference("Reporting", "reports", result);
  }

  public refreshStore() {
    this.Log(`Refreshing store`, "refreshStore");

    this.Store.set(this.getReports());
  }

  public async getReport(id: string) {
    this.Log(`Getting report ${id}`, `getReport`);
  }
}
