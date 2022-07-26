<script lang="ts">
  import { WindowStore } from "../../../ts/applogic/store";
  import { startOpened } from "../../../ts/desktop/main";
  import { UserData, UserName } from "../../../ts/userlogic/interfaces";

  function closeStart() {
    $startOpened = false;
  }
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
      {#each [...WindowStore] as [key, value]}
        <button>{value.info.name} ({key})</button>
      {/each}
    </div>
    <div class="right"><span class="material-icons">palette</span></div>
    <div class="bottom">
      <h1 class="username">{$UserName}</h1>
    </div>
  </div>
{/if}
