<script lang="ts">
  import "../../../../css/desktop/snapzones.css";
  import { maxZIndex } from "../../../../ts/applogic/store";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import LeftZone from "./SnapZones/LeftZone.svelte";
  import RightZone from "./SnapZones/RightZone.svelte";
</script>

<div
  class="snapzones"
  class:docked={$UserData.sh.taskbar.docked}
  class:launcher={$UserData.sh.taskbar.isLauncher}
  style="z-index:{$maxZIndex + 5};"
>
  <LeftZone />
  <RightZone />
</div>
