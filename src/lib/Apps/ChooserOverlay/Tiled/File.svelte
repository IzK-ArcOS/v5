<script lang="ts">
  import { onMount } from "svelte";
  import type { Writable } from "svelte/store";
  import { readFile } from "../../../../ts/api/fs/file";
  import { getMimeIcon } from "../../../../ts/api/fs/icon";
  import type { UserFile } from "../../../../ts/api/interface";
  import type { OverlayableApp } from "../../../../ts/applogic/interface";
  import { setTargetFile } from "../../../../ts/chooser/store";

  export let overlay: OverlayableApp;
  export let selected: Writable<string>;
  export let processing: Writable<boolean>;

  let img = "";

  onMount(() => {
    img = getMimeIcon(file.filename);
  });

  async function process() {
    $processing = true;

    const data = {
      name: file.filename,
      path: file.scopedPath,
      data: (await readFile(file.scopedPath)) as ArrayBuffer,
      mime: file.mime,
    };

    setTargetFile(overlay.id, data);

    $processing = false;
  }

  export let file: UserFile;
</script>

<button
  class="tile file"
  on:dblclick={process}
  class:selected={$selected == file.filename}
  on:click={() => ($selected = file.filename)}
>
  <div class="image"><img src={img} alt={file.filename} /></div>
  <p class="name">{file.filename}</p>
</button>
