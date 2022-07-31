<script lang="ts">
  import StartMenu from "./StartMenu.svelte";
  import Taskbar from "./Taskbar.svelte";
  import { startOpened } from "../../../ts/desktop/main";
import StartButton from "./Taskbar/StartButton.svelte";

  function startTog() {
    startOpened.set(!$startOpened);
  }
</script>

<StartMenu />
<Taskbar>
  <!-- <button on:click={startTog}>
    StartOpened: {$startOpened}
  </button> -->
  <StartButton/>
</Taskbar>
