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
  import { UserName } from "../../ts/userlogic/interfaces";
  import sleep from "../../ts/sleep";
  import { getUsers } from "../../ts/userlogic/main";

  export let thisState: State;

  let runtime: Login;
  let state: State;

  let show = false;

  onMount(async () => {
    runtime = new Login(
      NewLoginStates,
      "autologin",
      !thisState.attribs.continuation
    );

    if (thisState.attribs.continuation) {
      runtime.setUser($UserName);
      runtime.navigate(thisState.attribs.continuation as string);
    }

    runtime.UserCache.set(await getUsers());

    await sleep(500);

    show = true;

    runtime.CurrentState.subscribe((v) => {
      if (!v) return;

      state = v;

      if (state.onload) state.onload();
    });
  });
</script>

{#if runtime}
  <div class="newlogin fullscreen" class:show>
    <Background {state} {runtime} />
    <Darken {state} />
    <Topbar {state} {runtime} />
    <Paging {state} {runtime} />
  </div>
{/if}
