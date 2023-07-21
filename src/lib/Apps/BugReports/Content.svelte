<script lang="ts">
  import { onMount } from "svelte";
  import type { BugReportsRuntime } from "../../../ts/applogic/apps/BugReports/runtime";
  import type { Report } from "../../../ts/reporting/interface";
  import Header from "./Content/Header.svelte";
  import NotFound from "./Content/NotFound.svelte";
  import UserData from "./Content/UserData.svelte";
  import SystemLog from "./Content/SystemLog.svelte";
  import Issue from "./Content/Issue.svelte";
  import More from "./Content/More.svelte";
  import sleep from "../../../ts/sleep";

  export let runtime: BugReportsRuntime;

  let data: Report;
  let id: string;

  onMount(() => {
    runtime.Selected.subscribe(async (v) => {
      data = null;

      if (!v) return;

      await sleep(0);

      data = await runtime.getReport(v);
      id = v;
    });
  });
</script>

<div class="content">
  {#if data}
    <Header report={data} />
    <UserData report={data} />
    <SystemLog />
    <Issue report={data} {id} />
    <More report={data} />
  {:else}
    <NotFound />
  {/if}
</div>
