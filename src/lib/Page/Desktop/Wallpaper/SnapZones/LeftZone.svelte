<script>
  import { leftZoneTriggered } from "../../../../../ts/applogic/snapzones/store";
</script>

<div class="leftzone">
  <div
    class="visualizer"
    class:triggered={$leftZoneTriggered}
    id="snapZoneLeft"
  />
  <div class="trigger" id="snapTriggerLeft" />
</div>
