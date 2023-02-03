<script lang="ts">
  import { startOpened } from "$$ts/desktop/main";
  import ActionCenter from "./ActionCenter.svelte";
  import StartMenu from "./StartMenu.svelte";
  import Taskbar from "./Taskbar.svelte";
  import StartButton from "./Taskbar/StartButton.svelte";

  function startTog() {
    startOpened.set(!$startOpened);
  }
</script>

<StartMenu />
<Taskbar>
  <StartButton />
</Taskbar>
<ActionCenter />
