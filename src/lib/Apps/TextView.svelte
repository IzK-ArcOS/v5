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
  import { WindowStore } from "../../ts/applogic/store";
  import { tryParse } from "../../ts/json";
  import Actions from "./TextView/Actions.svelte";
  import Bottom from "./TextView/Bottom.svelte";
  import Saving from "./TextView/Saving.svelte";
  import TextArea from "./TextView/TextArea.svelte";

  export let app: App;

  let errored = false;
  let saving = false;
  let changing = false;
  let fileContents = "";
  let currentFile = "";

  onMount(() => {
    setShortcuts(app);
  });

  WindowStore.subscribe(() => {
    errored = false;

    if (changing) return;
    if (!app.openedFile) return (fileContents = "");
    if (currentFile == app.openedFile.path && fileContents) return;

    const text = new TextDecoder().decode(app.openedFile.data);

    fileContents = text;
    currentFile = app.openedFile.path;

    TextEditorContent.set(fileContents);

    const json = tryParse(fileContents);

    if (!json) return;

    if (json.error && json.valid == false) {
      errored = true;

      doLoadError(json.error.title, json.error.message);
    }
  });

  async function saveFile() {
    saving = true;

    saveTextEditorFile(fileContents, app.openedFile);

    saving = false;
  }

  async function onchange() {
    if ($TextEditorContent != fileContents) TextEditorContent.set(fileContents);
  }
</script>

<Actions {app} {saveFile} />

<div class="content" class:nofile={!app.openedFile}>
  {#if app.openedFile && !errored}
    <TextArea bind:fileContents {onchange} />

    <Bottom {fileContents} {app} />
  {/if}
</div>

<Saving bind:saving bind:app />
