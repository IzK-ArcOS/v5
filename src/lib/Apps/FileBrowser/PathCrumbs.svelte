<script lang="ts">
  import {
    fbClass,
    FileBrowserCurrentDir,
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

    console.log(str);

    return `${str}${crumb}`;
  }
</script>

<div class="addressbar">
  <button class="home" on:click={home}>
    <span class="material-icons-round">home</span>Home
  </button>
  {#each crumbs as crumb, i}
    <Crumb {crumb} path={generatePath(crumb, i)} />
  {/each}
</div>
