<script lang="ts">
  import { onMount } from "svelte";
  import type { StorageStat } from "../../../../../../ts/storage/interface";

  let css = "";

  export let total: number;
  export let data: StorageStat;

  onMount(() => {
    const width = (total / data.totalSize) * (data.allUsers - data.currentUser);

    css = `width: ${width}px;`;
  });
</script>

<div class="allusers" style={css} title="Other Users" />
