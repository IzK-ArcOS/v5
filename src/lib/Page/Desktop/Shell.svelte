<script lang="ts">
  import { startOpened } from "../../../ts/desktop/main";
  import ActionCenter from "./ActionCenter.svelte";
  import DesktopIcons from "./Shell/DesktopIcons.svelte";
  import HorizontalTaskbar from "./Shell/HorizontalTaskbar.svelte";
  import VerticalTaskbar from "./Shell/VerticalTaskbar.svelte";
  import StartMenu from "./StartMenu.svelte";
  import StartButton from "./Taskbar/StartButton.svelte";

  function startTog() {
    startOpened.set(!$startOpened);
  }
</script>

<StartMenu />
<HorizontalTaskbar><StartButton /></HorizontalTaskbar>
<VerticalTaskbar><StartButton /></VerticalTaskbar>
<!-- <Taskbar>
  <StartButton />
</Taskbar> -->
<ActionCenter />
