<script lang="ts">
  import type { State } from "../../../ts/state/interfaces";

  export let state: State;
</script>

{#if state}
  <div class="fullscreen darken" class:show={state.attribs.darken} />
{/if}
