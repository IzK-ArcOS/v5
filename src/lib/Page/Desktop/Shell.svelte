<script lang="ts">
  import StartMenu from "./StartMenu.svelte";
  import Taskbar from "./Taskbar.svelte";
  import { startOpened } from "../../../ts/desktop/main";

  let startButton: HTMLButtonElement;

  function startTog() {
    startOpened.set(!$startOpened);
  }
</script>

<StartMenu excludes={[startButton]} />
<Taskbar>
  <button on:click={startTog} bind:this={startButton}>
    StartOpened: {$startOpened}
  </button>
</Taskbar>
