<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/login.css";
  import { ConnectedServer } from "../../ts/api/main";
  import { applyLoginState, CurrentLoginState } from "../../ts/login/main";
  import { applyState } from "../../ts/state/main";
  import { getUsers } from "../../ts/userlogic/main";
  import Background from "./Login/Background.svelte";
  import Center from "./Login/Center.svelte";
  import Darken from "./Login/Darken.svelte";
  import Topbar from "./Login/Topbar.svelte";

  let show = false;

  onMount(async () => {
    const users = await getUsers();

    setTimeout(() => {
      show = true;
    }, 250);

    if (!Object.keys(users).length) {
      if (!$ConnectedServer) {
        applyState("fts");
      } else {
        applyLoginState("newapiuser");
      }

      return;
    }

    if (!$CurrentLoginState) applyLoginState("selector");
  });
</script>

<div class="login fullscreen" class:show>
  <Background />
  <Darken />
  <Topbar />
  <Center />
</div>
