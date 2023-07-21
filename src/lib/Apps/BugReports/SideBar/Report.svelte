<script lang="ts">
  import { onMount } from "svelte";
  import type { BugReportsRuntime } from "../../../../ts/applogic/apps/BugReports/runtime";
  import type { LocalReportData } from "../../../../ts/reporting/interface";
  import dayjs from "dayjs";
  import deletedIcon from "../../../../assets/apps/logger/clear.svg";
  import issueIcon from "../../../../assets/apps/helpcenter.svg";
  import reportIcon from "../../../../assets/apps/filemanager/file.svg";
  import errorIcon from "../../../../assets/apps/bugreports.svg";
  import { getReportIssue } from "../../../../ts/reporting/issues";
  import { reportExists } from "../../../../ts/reporting/main";
  import { createOverlayableError } from "../../../../ts/errorlogic/overlay";
  import { get } from "svelte/store";

  const statuses = {
    deleted: deletedIcon,
    issue: issueIcon,
    report: reportIcon,
  };

  let status: "deleted" | "issue" | "report" = "report";

  export let runtime: BugReportsRuntime;
  export let report: LocalReportData;

  let selected = false;

  onMount(async () => {
    runtime.Selected.subscribe((v) => (selected = v == report.id));

    if (!(await reportExists(report.id))) return (status = "deleted");
    if (await getReportIssue(report.id)) status = "issue";
  });

  function select() {
    runtime.Selected.set(report.id);
  }

  function remove() {
    createOverlayableError(
      {
        title: "Remove Report",
        message: `Are you sure you want to remove this report from your account? It will not be deleted from the Reports server, though nobody outside of the ArcOS Team will have access to the report.`,
        buttons: [
          { caption: "Keep", action() {} },
          {
            caption: "Remove Report",
            action: () => {
              runtime.deleteReport(report.id);
            },
          },
        ],
        image: errorIcon,
      },
      "BugReports"
    );
  }
</script>

<button on:click={select} class:selected class:deleted={status == "deleted"}>
  <img src={statuses[status]} alt="" class="icon" />
  <span>
    {dayjs(report.timestamp).format("D MMM YYYY, HH:mm:ss")}
  </span>
  {#if selected}
    <button
      class="delete material-icons-round"
      title="Remove Report"
      on:click={remove}
    >
      close
    </button>
  {/if}
</button>
