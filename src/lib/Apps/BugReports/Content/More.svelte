<script lang="ts">
  import type { Report } from "../../../../ts/reporting/interface";

  export let report: Report;
</script>

<div class="more-info">
  <h1>More Information</h1>
  <p class="subtitle">Below follows more information about this bug report.</p>
  <div class="info">
    <p class="name">ArcOS Version</p>
    <p class="value">{report.version}</p>
  </div>
  <div class="info">
    <p class="name">Resolved</p>
    <p class="value">{report.resolved ? "Yes" : "No"}</p>
  </div>
  <div class="info">
    <p class="name">Closed</p>
    <p class="value">{report.closed ? "Yes" : "No"}</p>
  </div>
</div>
