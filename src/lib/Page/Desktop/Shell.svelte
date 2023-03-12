<script lang="ts">
  import { startOpened } from "../../../ts/desktop/main";
  import ActionCenter from "./ActionCenter.svelte";
  import PushNotification from "./PushNotification.svelte";
  import HorizontalTaskbar from "./Shell/HorizontalTaskbar.svelte";
  import VerticalTaskbar from "./Shell/VerticalTaskbar.svelte";
  import StartMenu from "./StartMenu.svelte";
  import Taskbar from "./Taskbar.svelte";
  import StartButton from "./Taskbar/StartButton.svelte";
  import Wallpaper from "./Wallpaper.svelte";

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
