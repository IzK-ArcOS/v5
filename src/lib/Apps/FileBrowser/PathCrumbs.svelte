<script lang="ts">
  import {
    fbClass,
    FileBrowserCurrentDir,
    FileBrowserHome,
  } from "../../../ts/applogic/apps/FileBrowser/main";
  import Crumb from "./PathCrumbs/Crumb.svelte";

  let crumbs: string[] = [];

  FileBrowserCurrentDir.subscribe((v) => {
    crumbs = v.split("/");
  });

  function home() {
    fbClass.goToDirectory("./");
  }

  function generatePath(crumb: string, I: number) {
    let str = "";

    for (let i = 0; i < I; i++) {
      str += `${crumbs[i]}/`;
    }

    return `${str}${crumb}`;
  }
</script>

<button class="home material-icons-round" on:click={home}>home</button>
<div class="addressbar">
  {#if !$FileBrowserHome}
    {#each crumbs as crumb, i}
      <Crumb {crumb} path={generatePath(crumb, i)} />
    {/each}
  {:else}
    <button class="crumb">Home</button>
  {/if}
</div>
<button class="refresh material-icons-round" on:click={() => fbClass.refresh()}>
  refresh
</button>
