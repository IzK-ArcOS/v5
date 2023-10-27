<script lang="ts">
  import type { App } from "../../../../../../ts/applogic/interface";

  export let app: App;

  export let isBoot: boolean;

  export let min: () => void;
  export let max: () => void;
  export let cls: () => void;
</script>

<button
  class="material-icons-round reset"
  on:click={min}
  disabled={!app.controls.min || isBoot}
>
  minimize
</button>
<button
  class="material-icons-round reset"
  on:click={max}
  disabled={!app.controls.max || isBoot}
>
  crop_square
</button>
<button
  class="material-icons-round reset"
  on:click={cls}
  disabled={!app.controls.cls || isBoot}
>
  close
</button>

<style scoped>
  button {
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    font-size: 15px;
    width: 18px;
    height: 18px;
    color: var(--fg);
    transition: opacity 0.2s;
  }

  button:hover {
    color: var(--accent-light);
  }

  button:disabled {
    opacity: 0.2;
  }
</style>
