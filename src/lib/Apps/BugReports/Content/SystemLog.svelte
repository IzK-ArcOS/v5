<script lang="ts">
  import type { Report } from "../../../../ts/reporting/interface";
  import { showOverlay } from "../../../../ts/window/overlay";

  function show() {
    showOverlay("systemLogView", "BugReports");
  }
</script>

<div class="detail">
  <div class="left">
    <h1>System Log</h1>
    <p>The Log from when it happened</p>
  </div>
  <button on:click={show}>Show Data</button>
</div>
