<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/newlogin.css";
  import { Login } from "../../ts/newlogin/main";
  import { NewLoginStates } from "../../ts/newlogin/store";
  import type { State } from "../../ts/state/interfaces";
  import Background from "./NewLogin/Background.svelte";
  import Darken from "./NewLogin/Darken.svelte";
  import Paging from "./NewLogin/Paging.svelte";
  import Topbar from "./NewLogin/Topbar.svelte";

  let runtime: Login;
  let state: State;

  let show = false;

  onMount(async () => {
    runtime = new Login(NewLoginStates, "autologin");
    show = true;

    runtime.CurrentState.subscribe((v) => v && (state = v));
  });
</script>

{#if runtime}
  <div class="newlogin fullscreen" class:show>
    <Background {state} />
    <Darken {state} />
    <Topbar {state} {runtime} />
    <Paging {runtime} {state} />
  </div>
{/if}
