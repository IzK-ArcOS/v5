<script lang="ts">
  import type { Login } from "../../../ts/newlogin/main";
  import type { State } from "../../../ts/state/interfaces";

  export let state: State;
  export let runtime: Login;
</script>

{#if state}
  <div
    class="login-page fullscreen page-{state.key} {state.attribs.className ||
      ''}"
  >
    <svelte:component
      this={state.content}
      {runtime}
      key={state.key}
      loginState={state}
    />
  </div>
{/if}
