<script lang="ts">
  import type { App } from "../../../../../../ts/applogic/interface";

  export let app: App;

  export let isBoot: boolean;

  export let min: () => void;
  export let max: () => void;
  export let cls: () => void;
</script>

<button
  class="traffic-cls"
  on:click={cls}
  disabled={!app.controls.cls || isBoot}
/>

<button
  class="traffic-min"
  on:click={min}
  disabled={!app.controls.min || isBoot}
/>
<button
  class="traffic-max"
  on:click={max}
  disabled={!app.controls.max || isBoot}
/>
