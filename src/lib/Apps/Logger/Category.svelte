<script lang="ts">
  import type { LogItem } from "../../../ts/console";

  export let category: [string, LogItem[]];
  export let setView: (source: string) => void;
  export let currentSource: string;

  function apply() {
    if (!setView) return;

    setView(category[0]);
  }
</script>

<button on:click={apply} class:active={category[0] == currentSource}>
  <div class="name">{category[0]}</div>
  <div class="items">{category[1].length} items</div>
</button>
