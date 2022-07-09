<script lang="ts">
  import closable from "svelte-closable";
  import { startOpened } from "../../../ts/desktop/main";
  import { UserData } from "../../../ts/userlogic/interfaces";
  import Taskbar from "./Taskbar.svelte";

  export let excludes: any[];

  function closeStart() {
    $startOpened = false;
  }
</script>

{#if $UserData && excludes}
  <div
    class="startmenu"
    class:open={$startOpened}
    class:small={$UserData.sh.start.small}
    use:closable={{ exclude: excludes }}
    on:outside-click={closeStart}
  />
{/if}
