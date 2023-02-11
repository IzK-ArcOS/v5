<script lang="ts">
  import type { App } from "../../../../../../ts/applogic/interface";

  export let app: App;

  export let isBoot: boolean;

  export let min: () => void;
  export let max: () => void;
  export let cls: () => void;
</script>

<button
  class="material-icons-round"
  on:click={min}
  disabled={!app.controls.min || isBoot}
>
  minimize
</button>
<button
  class="material-icons-round"
  on:click={max}
  disabled={!app.controls.max || isBoot}
>
  crop_square
</button>
<button
  class="material-icons-round"
  on:click={cls}
  disabled={!app.controls.cls || isBoot}
>
  close
</button>
