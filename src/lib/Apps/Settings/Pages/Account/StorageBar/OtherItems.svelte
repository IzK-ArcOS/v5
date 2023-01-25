<script lang="ts">
  import { onMount } from "svelte";
  import type { StorageStat } from "../../../../../../ts/storage/interface";

  let css = "";

  export let total: number;
  export let data: StorageStat;

  onMount(() => {
    const width = (total / data.totalSize) * data.others;

    css = `width: ${width}px;`;
  });
</script>

<div class="otheritems" style={css} title="Others" />
