import { get, writable } from "svelte/store";
import { LogLevel } from "../../../console/interface";
import { createOverlayableError } from "../../../errorlogic/overlay";
import { BugRepIcon } from "../../../icon/apps";
import type { LocalReportData, Report } from "../../../reporting/interface";
import { getReport, reportExists } from "../../../reporting/main";
import sleep from "../../../sleep";
import type { App } from "../../interface";
import { getAppPreference, setAppPreference } from "../../pref";
import { AppRuntime } from "../../runtime/main";
export class BugReportsRuntime extends AppRuntime {
  public Selected = writable<string>();
  public Store = writable<LocalReportData[]>([]);
  public OpenedReport = writable<Report>(null);

  constructor(appData: App) {
    super(appData);

    this.refreshStore();

    this.Selected.subscribe(async (v) => {
      this.OpenedReport.set(await getReport(v));
    });
  }

  public getReports() {
    this.Log("Getting reports", "getReports");
    return (
      (getAppPreference("Reporting", "reports") as LocalReportData[]) || []
    );
  }

  public async getReport(id: string) {
    if (!id) return;

    this.Log(`Getting report ${id}`, `getReport`);

    const deleted = !(await reportExists(id));

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
              suggested: true,
            },
          ],
          image: BugRepIcon,
        },
        "BugReports"
      );

      return null;
    }

    return await getReport(id);
  }

  public deleteReport(id: string) {
    this.Log(`Deleting local report ${id}...`, "deleteReport", LogLevel.warn);
    const reports = this.getReports();
    const result = reports.filter((report) => report.id != id);

    setAppPreference("Reporting", "reports", result);

    this.refreshStore();

    const selected = get(this.Selected);

    if (selected == id) {
      this.Selected.set(null);
      this.OpenedReport.set(null);
    }
  }

  public async refreshStore() {
    this.Log(`Refreshing store`, "refreshStore");

    this.Store.set([]);

    await sleep(0);

    this.Store.set(this.getReports() || []);
  }
}
