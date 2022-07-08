<script lang="ts">
  import "../../css/desktop.css";
  import "../../css/desktop/theme/darkround.css";

  import { onMount } from "svelte";

  import Taskbar from "./Desktop/Taskbar.svelte";
  import Wallpaper from "./Desktop/Wallpaper.svelte";

  let show = false;

  onMount(() => setTimeout(() => (show = true), 1000));
</script>

<div class="desktop fullscreen theme-darkround" class:show>
  <Wallpaper />
  <Taskbar />
</div>
