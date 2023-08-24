<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/desktop/apps/textview.css";
  import {
    doLoadError,
    saveTextEditorFile,
    setShortcuts,
    TextEditorContent,
  } from "../../ts/applogic/apps/TextEditor/main";
  import type { App } from "../../ts/applogic/interface";
  import { tryParse } from "../../ts/json";
  import { showOverlay } from "../../ts/window/overlay";
  import Actions from "./TextView/Actions.svelte";
  import Bottom from "./TextView/Bottom.svelte";
  import Saving from "./TextView/Saving.svelte";
  import TextArea from "./TextView/TextArea.svelte";

  export let app: App;

  let errored = false;
  let saving = false;
  let changing = false;
  let fileContents = "";

  onMount(() => {
    app.events = {};

    app.events.openFile = (app) => {
      errored = false;

      if (changing) return;
      if (!app.openedFile) return (fileContents = "");

      const text = new TextDecoder().decode(app.openedFile.data);

      fileContents = text;

      TextEditorContent.set(fileContents);

      const json = tryParse(fileContents);

      if (!json) return;

      if (json.error && json.valid == false) {
        errored = true;

        doLoadError(json.error.title, json.error.message);
      }
    };

    app.events.open = onOpen;

    setShortcuts(app, saveFile);
  });

  async function saveFile() {
    if (!app.openedFile.path) {
      showOverlay("saveNewFile", "TextEditor");

      return;
    }

    saving = true;

    await saveTextEditorFile(fileContents, app.openedFile);

    saving = false;
  }

  async function onchange() {
    if ($TextEditorContent != fileContents) TextEditorContent.set(fileContents);
  }

  async function onOpen() {
    if (app.openedFile) return;

    app.openedFile = {
      name: "Untitled",
      path: "",
      data: new ArrayBuffer(0),
      mime: "text/plain",
    };
  }
</script>

<Actions {app} {saveFile} />

<div class="content" class:nofile={!app.openedFile}>
  {#if app.openedFile && !errored}
    <TextArea bind:fileContents {onchange} />

    <Bottom {fileContents} {app} />
  {/if}
</div>

<Saving {saving} bind:app />
