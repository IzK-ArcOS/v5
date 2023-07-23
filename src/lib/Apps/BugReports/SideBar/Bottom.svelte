<script lang="ts">
  import type { BugReportsRuntime } from "../../../../ts/applogic/apps/BugReports/runtime";
  import { showOverlay } from "../../../../ts/window/overlay";

  export let runtime: BugReportsRuntime;

  function refresh() {
    runtime.refreshStore();
  }
  function add() {
    showOverlay("createReport", "BugReports");
  }
</script>

<div class="bottom">
  <button class="refresh material-icons-round" on:click={refresh}
    >autorenew</button
  >
  <button class="new material-icons-round" on:click={add}>add</button>
</div>
