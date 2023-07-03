<script lang="ts">
  import { maxZIndex, AppStore } from "../../../ts/applogic/store";
  import { startOpened } from "../../../ts/desktop/main";
  import { UserData } from "../../../ts/userlogic/interfaces";
  import BottomPane from "./StartMenu/BottomPane.svelte";
  import Frame from "./StartMenu/Frame.svelte";
  import LeftPane from "./StartMenu/LeftPane.svelte";
  import RightPane from "./StartMenu/RightPane.svelte";

  $: AppStore;
</script>

{#if $UserData}
  <div
    class="startmenu"
    style="z-index: {$maxZIndex + 4};"
    class:open={$startOpened}
    class:small={$UserData.sh.start.small}
    class:colored={$UserData.sh.taskbar.colored}
  >
    <LeftPane />
    <RightPane />
    <BottomPane />
  </div>
{/if}
