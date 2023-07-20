<script lang="ts">
  import { onMount } from "svelte";
  import type { BugReportsRuntime } from "../../../../ts/applogic/apps/BugReports/runtime";
  import type { App } from "../../../../ts/applogic/interface";
  import type { Report } from "../../../../ts/reporting/interface";
  import UserDataExplorer from "../../../Page/Desktop/UserDataExplorer.svelte";
  import CloseButton from "../../../Page/Desktop/WindowStore/OverlayableWindow/CloseButton.svelte";

  export let runtime: BugReportsRuntime;
  export let app: App;
  export let id: string;

  let data: Report;

  onMount(() => {
    if (!runtime) return;

    runtime.OpenedReport.subscribe((v) => (data = v));
  });
</script>

{#if data}
  <UserDataExplorer data={data.userdata} />
{/if}
<CloseButton {app} {id} />
