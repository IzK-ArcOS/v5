<script lang="ts">
  import { UserData } from "../../../ts/userlogic/interfaces";
  import ActionCenter from "./ActionCenter.svelte";
  import PushNotification from "./PushNotification.svelte";
  import HorizontalTaskbar from "./Shell/HorizontalTaskbar.svelte";
  import Launcher from "./Shell/Launcher.svelte";
  import Shade from "./Shell/Shade.svelte";
  import VerticalTaskbar from "./Shell/VerticalTaskbar.svelte";
  import StartMenu from "./StartMenu.svelte";
  import StartButton from "./Taskbar/StartButton.svelte";
</script>

<Shade />
<StartMenu />
{#if !$UserData.sh.taskbar.isLauncher}
  <HorizontalTaskbar><StartButton /></HorizontalTaskbar>
  <VerticalTaskbar><StartButton /></VerticalTaskbar>
{:else}
  <Launcher />
{/if}
<!-- <Taskbar>
  <StartButton />
</Taskbar> -->
<ActionCenter />
<PushNotification />
