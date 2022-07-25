<script lang="ts">
  import { startOpened } from "../../../ts/desktop/main";
  import { UserData } from "../../../ts/userlogic/interfaces";

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
    <div class="left" />
    <div class="right"><span class="material-icons">palette</span></div>
    <div class="bottom" />
  </div>
{/if}
