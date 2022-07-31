<script lang="ts">
  import { openWindow } from "../../../ts/applogic/events";

  import { WindowStore } from "../../../ts/applogic/store";
  import { startOpened } from "../../../ts/desktop/main";
  import { UserData, UserName } from "../../../ts/userlogic/interfaces";
import AppListItem from "./StartMenu/AppListItem.svelte";

  function closeStart() {
    $startOpened = false;
  }

  $: WindowStore;
</script>

{#if $UserData}
  <div
    class="startframe fullscreen"
    class:present={$startOpened}
    on:click={closeStart}
  />
  <div
    class="startmenu"
    class:open={$startOpened}
    class:small={$UserData.sh.start.small}
  >
    <div class="left">
      {#each $WindowStore as window}
        <AppListItem app={window}/>
      {/each}
    </div>
    <div class="right"><span class="material-icons">palette</span></div>
    <div class="bottom">
      <h1 class="username">{$UserName}</h1>
    </div>
  </div>
{/if}
