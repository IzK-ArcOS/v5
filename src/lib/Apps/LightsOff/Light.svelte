<script lang="ts">
  import { SwitchLightsState } from "../../../ts/applogic/apps/LightsOff/toggle";

  export let light: boolean = false;
  export let x: number;
  export let y: number;

  function toggle() {
    SwitchLightsState(x, y);
  }
</script>

<button id="pos-{x}x{y}" class="light" class:lit={light} on:click={toggle} />

<style scoped>
  button.light.lit {
    background-color: var(--accent) !important;
  }
</style>
