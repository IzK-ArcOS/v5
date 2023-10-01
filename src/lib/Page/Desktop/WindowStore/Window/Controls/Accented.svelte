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
  class="material-icons-round reset close"
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
    color: var(--fg);
    transition: opacity 0.2s;
    background-color: var(--button-glass-bg);
    width: 22px;
    height: 22px;
    border-radius: 50%;
    margin-left: 5px;
  }

  button:first-child {
    margin-left: 0;
  }

  button:hover {
    color: var(--accent-light);
    background-color: var(--button-glass-hover-bg);
  }

  button:disabled {
    opacity: 0.2;
  }

  button.close {
    border-radius: 50%;
    background-color: var(--accent-light);
    width: 22px;
    height: 22px;
    color: var(--fg);
  }

  button.close:hover {
    background-color: var(--accent);
  }
</style>
