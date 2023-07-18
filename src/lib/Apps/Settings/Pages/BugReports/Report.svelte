<script lang="ts">
  import icon from "../../../../../assets/mimetypes/text-plain.svg";
  import dayjs from "dayjs";
  import type { LocalReportData } from "../../../../../ts/reporting/interface";
  import { onMount } from "svelte";
  import { getReportIssue } from "../../../../../ts/reporting/issues";
  import { reportExists } from "../../../../../ts/reporting/main";
  export let report: LocalReportData;

  let status = "Sent";
  let deleted = false;

  onMount(async () => {
    const issue = await getReportIssue(report.id);

    if (issue) status = `Issue #${issue.number}`;

    if (reportExists) {
      deleted = true;
      status = "Deleted!";
    }
  });
</script>

<button class="report" class:deleted>
  <img src={icon} alt="" class="icon" />
  <p class="time">
    {dayjs(report.timestamp).format("D MMM YYYY, HH:mm:ss")}
  </p>
  <p class="id">{report.id}</p>
  <div class="status">{status}</div>
</button>
