<script lang="ts">
  import "../../assets/desktop/apps/openwith.css";
  import { OpenWithFile } from "../../ts/applogic/apps/OpenWith";
  import type { App } from "../../ts/applogic/interface";
  import { getWindow } from "../../ts/applogic/store";
  import { findAppToOpen } from "../../ts/api/fs/open";
  import Option from "./OpenWith/Option.svelte";

  let options: App[] = [];
  let selected = "";

  OpenWithFile.subscribe((v) => {
    options = [];

    if (!v) return;

    const apps = findAppToOpen(v.mime);

    for (let i = 0; i < apps.length; i++) {
      options.push(getWindow(apps[i]));
    }

    selected = "";
  });
</script>

<input
  readonly
  type="text"
  value={$OpenWithFile ? $OpenWithFile.name : "<none>"}
  class="path"
/>
<p>Select an app with which you want to open this file.</p>
<div class="options">
  {#each options as option}
    <Option file={$OpenWithFile} app={option} bind:selected />
  {/each}
</div>
