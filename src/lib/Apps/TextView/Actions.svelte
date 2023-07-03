<script lang="ts">
  import md from "../../../assets/apps/markdownviewer.svg";
  import { createProcess } from "../../../ts/applogic/events";
  import type { Process } from "../../../ts/applogic/interface";

  import { showOpenFileDialog } from "../../../ts/chooser/main";
  export let process: Process;
  export let saveFile: () => void;
</script>

<div class="actions">
  <button
    class="material-icons-round open"
    on:click={() => showOpenFileDialog(process.id)}>folder_open</button
  >
  <button
    class="material-icons-round save"
    on:click={saveFile}
    disabled={!process.openedFile}>save</button
  >
  <div class="right">
    <button
      title="Open Markdown Viewer"
      on:click={() => createProcess("MarkDownViewer")}
      disabled={!process.openedFile || !process.openedFile.name.endsWith(".md")}
      class="markdown-open"
    >
      <img src={md} alt="Markdown Viewer" />
    </button>
  </div>
</div>
