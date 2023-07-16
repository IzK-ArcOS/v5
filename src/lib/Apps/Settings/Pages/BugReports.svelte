<script lang="ts">
  import "../../../../css/desktop/apps/settings/bugreports.css";
  import { onMount } from "svelte";
  import type { LocalReportData } from "../../../../ts/reporting/interface";
  import { getAppPreference } from "../../../../ts/applogic/pref";
  import Report from "./BugReports/Report.svelte";

  let reports: LocalReportData[] = [];

  onMount(() => {
    reports =
      (getAppPreference("Reporting", "reports") as LocalReportData[]) || [];
  });
</script>

<div class="page-bugreports">
  <h1>Bug Reports</h1>
  {#each reports as report}
    <Report {report} />
  {/each}
</div>
