<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { getDirectory } from "../../ts/api/fs/directory";
  import { defaultDirectory, UserDirectory } from "../../ts/api/interface";
  import type { OverlayableApp } from "../../ts/applogic/interface";
  import { getChooserTarget } from "../../ts/chooser/store";
  import BottomPane from "./ChooserOverlay/BottomPane.svelte";
  import Dir from "./ChooserOverlay/Dir.svelte";
  import File from "./ChooserOverlay/File.svelte";
  import TopBar from "./ChooserOverlay/TopBar.svelte";
  import "../../css/desktop/chooseroverlay.css";
  import icon from "../../assets/apps/filemanager/file.svg";
  import Spinner from "../Spinner.svelte";
  import Tiled from "./ChooserOverlay/Tiled.svelte";

  export let overlay: OverlayableApp;

  let tiled = false;
  let currentDir = writable<UserDirectory>(defaultDirectory);
  let currentPath = writable<string>("./");
  let selected = writable<string>(null);
  let processing = writable<boolean>(false);

  function setDir(path: string) {
    $currentPath = path;

    refresh();
  }

  async function refresh() {
    $currentDir = defaultDirectory;

    $currentDir = (await getDirectory($currentPath)) || null;
  }
</script>

{#if overlay}
  <TopBar {currentPath} {refresh} {setDir} bind:tiled />
  <div class="content">
    {#if tiled}
      <Tiled data={$currentDir} {setDir} {overlay} {selected} {processing} />
    {:else}
      {#each $currentDir.directories as dir}
        <Dir {setDir} {dir} {selected} />
      {/each}
      {#each $currentDir.files as file}
        <File {file} {overlay} {selected} {processing} />
      {/each}
    {/if}

    {#if $processing}
      <div class="processing-overlay">
        <div class="processing-content">
          <div class="processing">
            <img src={icon} alt="" />
            <p class="caption">Opening {$selected}...</p>
            <Spinner height={30} />
          </div>
        </div>
      </div>
    {/if}
  </div>
  <BottomPane {currentDir} {currentPath} {selected} {overlay} {processing} />
{/if}
