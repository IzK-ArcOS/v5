<script lang="ts">
  import type { Report } from "../../../../ts/reporting/interface";
  import { showOverlay } from "../../../../ts/window/overlay";

  export let report: Report;

  function show() {
    showOverlay("udataExplorer", "BugReports");
  }
</script>

<div class="detail">
  <div class="left">
    <h1>User Data</h1>
    <p>Your ArcOS Settings</p>
  </div>
  <button disabled={!report.userdata} on:click={show}>
    {report.userdata ? "Show Data" : "Not Provided"}
  </button>
</div>
