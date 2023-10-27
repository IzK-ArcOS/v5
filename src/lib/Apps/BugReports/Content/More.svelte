<script lang="ts">
  import { MODE_CAPTIONS } from "../../../../ts/branding/mode";
  import type { Report } from "../../../../ts/reporting/interface";

  export let report: Report;
</script>

<div class="more-info">
  <h1>More Information</h1>
  <p class="subtitle">Below follows more information about this bug report.</p>
  <div class="info">
    <p class="name">ArcOS Version</p>
    <p class="value">v{report.version}-{report.mode_file}</p>
  </div>
  <div class="info">
    <p class="name">Mode</p>
    <p class="value" title={report.mode_file}>
      {MODE_CAPTIONS[report.mode_file || "release"] || report.mode_file}
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
    <p class="value useragent">
      {report.useragent || "Not provided"}
    </p>
  </div>
</div>

<style scoped>
  p.useragent {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
