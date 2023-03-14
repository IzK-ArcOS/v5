<script lang="ts">
  import { openWindow } from "../../../ts/applogic/events";
  import type { App } from "../../../ts/applogic/interface";
  import md from "../../../assets/apps/markdownviewer.svg";

  import { showOpenFileDialog } from "../../../ts/chooser/main";
  export let app: App;
  export let saveFile: () => void;
</script>

<div class="actions">
  <button
    class="material-icons-round open"
    on:click={() => showOpenFileDialog(app.id)}>folder_open</button
  >
  <button
    class="material-icons-round save"
    on:click={saveFile}
    disabled={!app.openedFile}>save</button
  >
  <div class="right">
    <button
      title="Open Markdown Viewer"
      on:click={() => openWindow("MarkDownViewer")}
      disabled={!app.openedFile || !app.openedFile.name.endsWith(".md")}
      class="markdown-open"
    >
      <img src={md} alt="Markdown Viewer" />
    </button>
  </div>
</div>
