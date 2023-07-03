<script lang="ts">
  import type { App } from "../../../../../../ts/applogic/interface";

  export let app: App;

  export let isBoot: boolean;

  export let min: () => void;
  export let cls: () => void;
</script>

<button
  class="reset"
  on:click={min}
  disabled={isBoot || !app.controls.minimized}>🗕</button
>
<button
  class="reset close"
  on:click={cls}
  disabled={isBoot || !app.controls.close}>✖</button
>

<style scoped>
  button {
    width: 20px;
    height: 20px;
    margin: 0;
    padding-top: 0;
    padding-left: 5px;
    padding-bottom: 2px;
    border-radius: 5px;
    border: none;
    background-color: #0000001f;
    color: var(--fg);
    vertical-align: middle;
  }

  button:hover {
    background: rgba(100, 100, 100, 0.512);
  }

  button.close {
    background-color: rgba(255, 0, 0, 0.8);
    color: white;
  }

  button.close:hover {
    background: rgba(255, 50, 50, 1);
  }
</style>
