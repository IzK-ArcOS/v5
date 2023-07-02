<script lang="ts">
  import { get } from "svelte/store";
  import icon from "../../../../assets/apps/textview/save.svg";
  import { openUserFile } from "../../../../ts/api/fs/open/main";
  import {
    TextEditorContent,
    saveTextEditorFile,
  } from "../../../../ts/applogic/apps/TextEditor/main";
  import { hideOverlay } from "../../../../ts/window/overlay";

  let value = "";

  function closeThis() {
    hideOverlay("saveNewFile", "TextEditor");
  }

  async function save() {
    await saveTextEditorFile(get(TextEditorContent), {
      name: null,
      path: value,
      data: null,
      mime: "",
    });

    const split = value.split("/");

    await openUserFile({
      filename: split[split.length - 1],
      mime: "text/plain",
      scopedPath: value,
    });

    closeThis();
  }
</script>

<div class="wrapper">
  <img src={icon} alt="Save File" />
  <div class="inner">
    <p class="caption">Enter a path to save this file to:</p>
    <input type="text" bind:value />
  </div>
</div>
<div class="actions">
  <div class="inner">
    <button on:click={save} disabled={!value}>Save</button>
    <button on:click={closeThis}>Cancel</button>
  </div>
</div>

<style scoped>
  div.wrapper {
    display: flex;
    padding: 15px;
  }

  div.wrapper img {
    min-width: 32px;
    height: 32px;
    margin-right: 10px;
  }

  div.wrapper p {
    max-width: 250px;
  }

  div.wrapper input {
    width: 300px;
    margin-top: 10px;
  }

  div.actions {
    display: flex;
    padding: 10px;
    padding-top: 0;
  }

  div.actions div.inner {
    margin-left: auto;
  }
</style>
