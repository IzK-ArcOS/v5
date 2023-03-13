<script lang="ts">
  import "../../../../css/desktop/snapzones.css";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import LeftZone from "./SnapZones/LeftZone.svelte";
  import RightZone from "./SnapZones/RightZone.svelte";
</script>

<div class="snapzones" class:docked={$UserData.sh.taskbar.docked}>
  <LeftZone />
  <RightZone />
</div>
