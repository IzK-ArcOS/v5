<script lang="ts">
  import type { LightsOffRuntime } from "../../../ts/applogic/apps/LightsOff/runtime";

  export let light: boolean = false;
  export let x: number;
  export let y: number;
  export let runtime: LightsOffRuntime;

  function toggle() {
    runtime.ToggleLight(x, y);
  }
</script>

<button id="pos-{x}x{y}" class="light" class:lit={light} on:click={toggle} />

<style scoped>
  button.light.lit {
    background-color: var(--accent) !important;
  }
</style>
