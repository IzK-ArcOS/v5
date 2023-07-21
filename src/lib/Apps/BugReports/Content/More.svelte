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
    <p class="name">Mode</p>
    <p class="value">
      {report.mode_file || "<unknown>"}
    </p>
  </div>
  <div class="info">
    <p class="name">Desktop app</p>
    <p class="value">
      {report.desktop ? "Yes" : "No"}
    </p>
  </div>
  <div class="info">
    <p class="name">User Agent</p>
    <p class="value">
      {report.useragent || "Not provided"}
    </p>
  </div>
</div>
