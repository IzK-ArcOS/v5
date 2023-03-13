<script>
  import { rightZoneTriggered } from "../../../../../ts/applogic/snapzones/store";
</script>

<div class="rightzone">
  <div
    class="visualizer"
    class:triggered={$rightZoneTriggered}
    id="snapZoneRight"
  />
  <div class="trigger" id="snapTriggerRight" />
</div>
