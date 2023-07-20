<script lang="ts">
  import icon from "../../../../assets/apps/filemanager/file.svg";
  import type { Report } from "../../../../ts/reporting/interface";

  export let report: Report;
</script>

<div class="header">
  <img src={icon} alt="" />
  <div>
    <h1>{report.title || `Report from ${report.author}`}</h1>
    <p>
      <span class="author">{report.author}</span> - {report.api || "No API"}
    </p>
  </div>
</div>
