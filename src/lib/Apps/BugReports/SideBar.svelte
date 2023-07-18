<script lang="ts">
  import { onMount } from "svelte";
  import type { BugReportsRuntime } from "../../../ts/applogic/apps/BugReports/runtime";
  import type { LocalReportData } from "../../../ts/reporting/interface";
  import Report from "./SideBar/Report.svelte";
  import Bottom from "./SideBar/Bottom.svelte";

  export let runtime: BugReportsRuntime;

  let store: LocalReportData[] = [];

  onMount(() => {
    runtime.Store.subscribe((v) => (store = v));
  });
</script>

<div class="sidebar">
  <div class="list">
    {#each store as report}
      <Report {runtime} {report} />
    {/each}
  </div>
  <Bottom {runtime} />
</div>
