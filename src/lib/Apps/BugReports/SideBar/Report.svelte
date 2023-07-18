<script lang="ts">
  import { onMount } from "svelte";
  import type { BugReportsRuntime } from "../../../../ts/applogic/apps/BugReports/runtime";
  import type { LocalReportData } from "../../../../ts/reporting/interface";
  import dayjs from "dayjs";

  export let runtime: BugReportsRuntime;
  export let report: LocalReportData;

  let selected = false;

  onMount(() => {
    runtime.Selected.subscribe((v) => (selected = v == report.id));
  });

  function select() {
    runtime.Selected.set(report.id);
  }
</script>

<button on:click={select} class:selected>
  {dayjs(report.timestamp).format("D MMM YYYY, HH:mm:ss")}
</button>
