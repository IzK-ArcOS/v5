<script lang="ts">
  import type { App } from "../../../../../../ts/applogic/interface";

  export let app: App;

  export let isBoot: boolean;

  export let min: () => void;
  export let max: () => void;
  export let cls: () => void;
</script>

<button
  class="traffic-cls reset"
  on:click={cls}
  disabled={!app.controls.close || isBoot}
/>

<button
  class="traffic-min reset"
  on:click={min}
  disabled={!app.controls.minimized || isBoot}
/>
<button
  class="traffic-max reset"
  on:click={max}
  disabled={!app.controls.maximized || isBoot}
/>

<style scoped>
  button {
    border: var(--button-bg) 1px solid;
    width: 12px;
    height: 12px;
    border-radius: 11px;
    padding: 0;
  }

  button + button {
    margin-left: 8px;
  }

  button:last-child {
    margin-right: 5px;
  }

  button:hover {
    opacity: 0.5;
  }

  button:active {
    opacity: 0.2;
  }
  button:disabled {
    background-color: var(--button-active-bg);
    border: var(--button-active-bg);
  }

  button.traffic-cls {
    border: #d04e41 0.5px solid !important;
    background-color: #ec695e !important;
  }
  button.traffic-min {
    border: #d59f3c 0.5px solid !important;
    background-color: #f5c14f !important;
  }

  button.traffic-max {
    border: #4fa63b 0.5px solid !important;
    background-color: #61c654 !important;
  }
</style>
