<script lang="ts">
  import { FileIcon } from "../../../../ts/icon/general";
  import type { Report } from "../../../../ts/reporting/interface";
  import { showOverlay } from "../../../../ts/window/overlay";

  export let report: Report;
  export let id: string;

  function showBody() {
    showOverlay("bodyView", "BugReports");
  }
</script>

<div class="header">
  <img src={FileIcon} alt="" />
  <div>
    <h1 data-contextmenu="report-export" data-id={id}>
      {report.title || `Report from ${report.author}`}
    </h1>
    <p>
      <span class="author">{report.author}</span> - {report.api || "No API"}
    </p>
  </div>
  <button
    class="material-icons-round show-body"
    on:click={showBody}
    title="View report body"
  >
    chat
  </button>
</div>
