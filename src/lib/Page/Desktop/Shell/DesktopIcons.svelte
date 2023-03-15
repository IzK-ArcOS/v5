<script>
  import "../../../../css/desktop/desktopicons.css";
  import { isPopulatable } from "../../../../ts/applogic/checks";
  import { WindowStore } from "../../../../ts/applogic/store";
  import DesktopIcon from "./DesktopIcons/DesktopIcon.svelte";
</script>

<div class="desktopIcons">
  {#each $WindowStore as app}
    {#if isPopulatable(app)}
      <DesktopIcon {app} />
    {/if}
  {/each}
</div>
