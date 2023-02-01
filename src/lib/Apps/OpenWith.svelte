<script lang="ts">
  import "../../assets/desktop/apps/openwith.css";
  import {
    findAppToOpen,
    getAllFileHandlers,
    openWith,
  } from "../../ts/api/fs/open";
  import { FileLoaders } from "../../ts/api/fs/open/loader";
  import type { UserFileLoader } from "../../ts/api/interface";
  import { OpenWithFile } from "../../ts/applogic/apps/OpenWith";
  import { closeWindow } from "../../ts/applogic/events";
  import type { App } from "../../ts/applogic/interface";
  import { getWindow, isFullscreenWindow } from "../../ts/applogic/store";
  import LoaderOption from "./OpenWith/LoaderOption.svelte";
  import Option from "./OpenWith/Option.svelte";

  let options: App[] = [];
  let loaderOptions: UserFileLoader[] = [];
  let selected = "";
  let filename = "";

  OpenWithFile.subscribe((v) => {
    if (!v) return (filename = "file");

    console.debug(v);

    filename = v.name;
    options = [];
    loaderOptions = [];

    let apps = [];

    if (v.anymime) apps = getAllFileHandlers();
    else apps = findAppToOpen(v.mime);

    for (let i = 0; i < apps.length; i++) {
      options.push(getWindow(apps[i]));
    }

    selected = "";

    const loaders = Object.entries(FileLoaders);

    for (let i = 0; i < loaders.length; i++) {
      const loader = loaders[i];

      const data = loader[1];

      for (let j = 0; j < data.extensions.length; j++) {
        if (filename.endsWith(data.extensions[j])) loaderOptions.push(data);
      }
    }
  });

  function openThis() {
    const window = getWindow(selected);
    if (window) {
      openWith(window.id, $OpenWithFile, $OpenWithFile.anymime);
    } else {
      for (let i = 0; i < loaderOptions.length; i++) {
        if (loaderOptions[i].name == selected)
          loaderOptions[i].loader($OpenWithFile);

        $OpenWithFile = null;
      }
    }

    setTimeout(() => {
      OpenWithFile.set(null);
    }, 1000);
    isFullscreenWindow.set(false);
    closeWindow("OpenWithApp");
  }
</script>

<div class="content">
  <p class="title">Select an item to open {filename}</p>
  <div class="options">
    <p class="category">Apps</p>
    {#each options as option}
      <Option
        file={$OpenWithFile}
        app={option}
        bind:loaderOptions
        bind:options
        bind:selected
      />
    {/each}
    {#if !options.length}
      <p class="noitems">No apps found</p>
    {/if}
    <p class="category">Handlers</p>
    {#each loaderOptions as loader}
      <LoaderOption
        {loader}
        file={$OpenWithFile}
        bind:loaderOptions
        bind:options
        bind:selected
      />
    {/each}
    {#if !loaderOptions.length}
      <p class="noitems">No handlers found</p>
    {/if}
  </div>
  <div class="actions">
    <button disabled={!selected} on:click={openThis}>Open</button>
    <button on:click={() => closeWindow("OpenWithApp")}>Cancel</button>
  </div>
</div>
