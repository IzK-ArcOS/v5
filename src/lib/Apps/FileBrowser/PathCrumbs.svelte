<script lang="ts">
  import { fbClass, fbState } from "../../../ts/applogic/apps/FileBrowser/main";
  import Crumb from "./PathCrumbs/Crumb.svelte";

  let crumbs: string[] = [];

  fbState.subscribe((v) => {
    crumbs = v.currentDir.split("/");
  });

  function topMost() {
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

<button
  class="home material-icons-round"
  on:click={topMost}
  disabled={$fbState.refreshing ||
    ($fbState.currentDir == "./" && !$fbState.home)}
>
  first_page
</button>
<div class="addressbar">
  {#if !$fbState.home}
    {#each crumbs as crumb, i}
      <Crumb {crumb} path={generatePath(crumb, i)} />
    {/each}
  {:else}
    <button class="crumb">Home</button>
  {/if}
</div>

<button
  class="refresh material-icons-round"
  on:click={() => fbClass.refresh()}
  disabled={$fbState.home || $fbState.refreshing}
>
  refresh
</button>
