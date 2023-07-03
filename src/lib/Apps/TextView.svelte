<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/desktop/apps/textview.css";
  import {
    doLoadError,
    saveTextEditorFile,
    setShortcuts,
    TextEditorContent,
  } from "../../ts/applogic/apps/TextEditor/main";
  import type { App, Process } from "../../ts/applogic/interface";
  import { AppStore } from "../../ts/applogic/store";
  import { tryParse } from "../../ts/json";
  import Actions from "./TextView/Actions.svelte";
  import Bottom from "./TextView/Bottom.svelte";
  import Saving from "./TextView/Saving.svelte";
  import TextArea from "./TextView/TextArea.svelte";
  import { showOverlay } from "../../ts/window/overlay";

  export let process: Process;
  export let app: App;
  export let pid: number;

  let errored = false;
  let saving = false;
  let changing = false;
  let fileContents = "";
  let currentFile = "";

  onMount(() => {
    app.events = {};

    app.events.openFile = (app) => {
      errored = false;

      if (changing) return;
      if (!process.openedFile) return (fileContents = "");

      const text = new TextDecoder().decode(process.openedFile.data);

      fileContents = text;
      currentFile = process.openedFile.path;

      TextEditorContent.set(fileContents);

      const json = tryParse(fileContents);

      if (!json) return;

      if (json.error && json.valid == false) {
        errored = true;

        doLoadError(pid, json.error.title, json.error.message);
      }
    };

    app.events.open = onOpen;

    setShortcuts(process, saveFile);
  });

  async function saveFile() {
    if (!process.openedFile.path) {
      showOverlay("saveNewFile", pid);

      return;
    }

    saving = true;

    await saveTextEditorFile(fileContents, process.openedFile);

    saving = false;
  }

  async function onchange() {
    if ($TextEditorContent != fileContents) TextEditorContent.set(fileContents);
  }

  async function onOpen() {
    if (process.openedFile) return;

    process.openedFile = {
      name: "Untitled",
      path: "",
      data: new ArrayBuffer(0),
      mime: "text/plain",
    };
  }
</script>

{#if process}
  <Actions {process} {saveFile} />

  <div class="content" class:nofile={!process.openedFile}>
    {#if process.openedFile && !errored}
      <TextArea bind:fileContents {onchange} />

      <Bottom {fileContents} {process} />
    {/if}
  </div>
  <Saving {saving} parent={process} />
{/if}
