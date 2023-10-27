<script lang="ts">
  import type { Writable } from "svelte/store";
  import { partialFileToComplete } from "../../../ts/api/fs/convert";
  import type { UserDirectory } from "../../../ts/api/interface";
  import type { OverlayableApp } from "../../../ts/applogic/interface";
  import { getWindow } from "../../../ts/applogic/store";
  import { getChooserTarget, setTargetFile } from "../../../ts/chooser/store";
  import { hideOverlay } from "../../../ts/window/overlay";
  import { Log } from "../../../ts/console";
  import { LogLevel } from "../../../ts/console/interface";

  export let currentDir: Writable<UserDirectory>;
  export let currentPath: Writable<string>;
  export let selected: Writable<string>;
  export let processing: Writable<boolean>;
  export let overlay: OverlayableApp;

  async function open() {
    $processing = true;

    let file;

    for (let i = 0; i < $currentDir.files.length; i++) {
      if ($currentDir.files[i].filename == $selected)
        file = $currentDir.files[i];
    }

    const data = await partialFileToComplete(file);

    hideOverlay(overlay.id, getChooserTarget(overlay.id) as string);

    setTargetFile(overlay.id, data);

    $processing = false;
  }

  function dispose() {
    const targetId = getChooserTarget(overlay.id) as string;
    const targetWindow = getWindow(targetId);

    hideOverlay(overlay.id, targetId);

    if (!targetWindow)
      return Log(
        "ChooserOverlay: dispose",
        `Could not get target window ${targetId}`,
        LogLevel.warn
      );

    setTargetFile(overlay.id, targetWindow.openedFile);
  }
</script>

<div class="bottompane">
  <div class="buttons">
    <button class="cancel" on:click={dispose}>Cancel</button>
    <button
      class="confirm"
      disabled={!$currentPath || !$selected}
      on:click={open}>Open</button
    >
  </div>
</div>
