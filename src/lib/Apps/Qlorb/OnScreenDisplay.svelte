<script lang="ts">
  import type { QlorbRuntime } from "../../../ts/applogic/apps/Qlorb/runtime";
  import Credits from "./OnScreenDisplay/Credits.svelte";
  import Score from "./OnScreenDisplay/Score.svelte";

  export let runtime: QlorbRuntime;
</script>

<div class="osd fullscreen">
  <div class="topleft"></div>
  <div class="topright"></div>
  <div class="bottomleft">
    <Score {runtime} />
  </div>
  <div class="bottomright">
    <!-- <Credits /> -->
  </div>
</div>
