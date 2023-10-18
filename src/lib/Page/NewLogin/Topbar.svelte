<script lang="ts">
  import { onMount } from "svelte";
  import type { Login } from "../../../ts/newlogin/main";
  import type { State } from "../../../ts/state/interfaces";
  import Clock from "./Topbar/Clock.svelte";
  import HostSelector from "./Topbar/HostSelector.svelte";
  import Right from "./Topbar/Right.svelte";

  export let runtime: Login;
  export let state: State;

  let show = false;

  onMount(() => {
    setTimeout(() => (show = true), 750);
  });
</script>

{#if state}
  <div class="topbar" class:show={(state.attribs.topbar || false) && show}>
    <HostSelector {runtime} />
    <Clock />
    <Right {runtime} />
  </div>
{/if}
