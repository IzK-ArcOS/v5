<script lang="ts">
  import save from "../../assets/apps/textview/save.svg";
  import md from "../../assets/apps/markdownviewer.svg";
  import "../../css/desktop/apps/textview.css";
  import { writeFile } from "../../ts/api/fs/file";
  import { openWith } from "../../ts/api/fs/open";
  import { formatBytes } from "../../ts/api/fs/sizes";
  import { TextEditorContent } from "../../ts/applogic/apps/TextEditor/main";
  import { closeWindow, openWindow } from "../../ts/applogic/events";
  import type { App } from "../../ts/applogic/interface";
  import { WindowStore } from "../../ts/applogic/store";
  import { showOpenFileDialog } from "../../ts/chooser/main";
  import { createOverlayableError } from "../../ts/errorlogic/overlay";
  import { tryParse } from "../../ts/json";
  import Spinner from "../Spinner.svelte";
  import { onMount } from "svelte";
  import { registerShortcuts } from "../../ts/applogic/keyboard/main";

  export let app: App;

  let errored = false;
  let saving = false;
  let changing = false;
  let fileContents = "";
  let currentFile = "";

  onMount(() => {
    registerShortcuts(
      [
        {
          key: "o",
          alt: true,
          action: () => {
            showOpenFileDialog(app.id);
          },
        },
        {
          key: "m",
          alt: true,
          action: () => {
            if (!app.openedFile || !app.openedFile.name.endsWith(".md")) return;

            openWindow("MarkDownViewer");
          },
        },
      ],
      "TextEditor"
    );
  });

  WindowStore.subscribe(() => {
    errored = false;

    if (changing) return;
    if (!app.openedFile) return (fileContents = "");
    if (currentFile == app.openedFile.path) return;
    if (!app.openedFile.mime.startsWith("text/")) {
      createOverlayableError(
        {
          title: "Can't open file",
          message:
            "The mimetype of the file is incompatible with this application.",
          buttons: [{ caption: "OK", action() {} }],
        },
        "TextEditor"
      );
      return (fileContents = "");
    }

    fileContents = new TextDecoder().decode(app.openedFile.data);
    currentFile = app.openedFile.path;
    onchange();

    const json = tryParse(fileContents);

    if (!json) return;

    if (json.error && json.valid == false) {
      errored = true;

      return createOverlayableError(
        {
          title: json.error.title,
          message: json.error.message,
          buttons: [
            { caption: "Close", action: () => closeWindow("TextEditor") },
          ],
        },
        "TextEditor"
      );
    }
  });

  async function saveFile() {
    saving = true;
    const path = app.openedFile.path;
    const data = new Blob([fileContents]);

    await writeFile(path, data);

    const file = { ...app.openedFile, data: await data.arrayBuffer() };

    setTimeout(() => {
      openWith(app.id, file);
    });

    saving = false;
  }

  async function onchange() {
    TextEditorContent.set(fileContents);
  }
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

<div class="content">
  {#if app.openedFile && !errored}
    <textarea
      bind:value={fileContents}
      spellcheck={false}
      on:change={onchange}
      on:input={onchange}
      on:keydown={onchange}
    />

    <div class="bottom">
      <div class="right">
        <div class="section">
          Size: {formatBytes(fileContents.length)}
        </div>
        <div class="section">
          {app.openedFile.name}
        </div>
        <div class="section">
          {app.openedFile.mime.split(";")[0]}
        </div>
      </div>
    </div>
  {/if}
</div>

{#if saving && app.openedFile}
  <div class="saving-wrapper">
    <div class="saving-content">
      <img src={save} alt="Saving" />
      <p class="caption">Saving {app.openedFile.name}...</p>
      <Spinner height={24} />
    </div>
  </div>
{/if}
