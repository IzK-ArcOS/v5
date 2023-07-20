<script lang="ts">
  import { onMount } from "svelte";
  import type { BugReportsRuntime } from "../../../../ts/applogic/apps/BugReports/runtime";
  import type { App } from "../../../../ts/applogic/interface";
  import type { Report } from "../../../../ts/reporting/interface";
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

{#if data && data.log}
  <textarea readonly value={data.log} />
{/if}
<CloseButton {app} {id} />

<style scoped>
  textarea {
    background-color: var(--win-bg);
    color: var(--fg);
    font-family: "Source Code Pro", monospace;
    width: calc(100% - 20px);
    height: 100%;
    resize: none !important;
    border: none;
    white-space: pre;
    overflow-wrap: normal;
    overflow-x: scroll;
    font-size: 11px;
  }
</style>
