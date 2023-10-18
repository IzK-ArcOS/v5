<script lang="ts">
  import type { State } from "../../../ts/state/interfaces";

  export let state: State;
</script>

{#if state}
  <div class="background fullscreen" class:zoom={state.attribs.darken} />
{/if}
