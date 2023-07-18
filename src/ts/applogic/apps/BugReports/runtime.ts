import { writable } from "svelte/store";
import type { LocalReportData } from "../../../reporting/interface";
import type { App } from "../../interface";
import { getAppPreference, setAppPreference } from "../../pref";
import { AppRuntime } from "../../runtime/main";
import { LogLevel } from "../../../console/interface";
import { getReportIssue } from "../../../reporting/issues";
import { getReport, reportExists } from "../../../reporting/main";
import { createOverlayableError } from "../../../errorlogic/overlay";
import errorIcon from "../../../../assets/apps/bugreports.svg";
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

    this.refreshStore();
  }

  public refreshStore() {
    this.Log(`Refreshing store`, "refreshStore");

    this.Store.set(this.getReports());
  }

  public async getReport(id: string) {
    if (!id) return;

    this.Log(`Getting report ${id}`, `getReport`);

    const deleted = !(await reportExists(id));

    console.log(deleted);

    if (deleted) {
      createOverlayableError(
        {
          title: "Report Deleted!",
          message: `Report ${id} has been deleted from the reports server and it cannot be accessed. Do you want to delete it from your account?`,
          buttons: [
            { caption: "Keep", action() {} },
            {
              caption: "Remove Report",
              action: () => {
                this.deleteReport(id);
              },
            },
          ],
          image: errorIcon,
        },
        "BugReports"
      );

      return null;
    }

    return await getReport(id);
  }
}
