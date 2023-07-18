<script lang="ts">
  import { onMount } from "svelte";
  import type { BugReportsRuntime } from "../../../ts/applogic/apps/BugReports/runtime";
  import type { Report } from "../../../ts/reporting/interface";
  import { getReport } from "../../../ts/reporting/main";

  export let runtime: BugReportsRuntime;

  let data: Report;

  onMount(() => {
    runtime.Selected.subscribe(
      async (v) => v && (data = await runtime.getReport(v))
    );
  });
</script>

<div class="content">
  {#if data}
    {data.author} - {data.api}
    <hr />
    {data.body}
  {/if}
</div>
