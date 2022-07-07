<script lang="ts">
  import "../../css/login.css";
  import { onMount } from "svelte";
  import { applyLoginState } from "../../ts/login/main";
  import { getUsers } from "../../ts/userlogic/main";
  import { applyState } from "../../ts/state/main";
  import Topbar from "./Login/Topbar.svelte";
  import Center from "./Login/Center.svelte";
  import Darken from "./Login/Darken.svelte";
  import Background from "./Login/Background.svelte";

  let show = false;

  onMount(() => {
    const users = getUsers();

    if (!Object.keys(users).length) {
      applyState("fts");

      return;
    }

    applyLoginState("selector");

    setTimeout(() => {
      show = true;
    }, 250);
  });
</script>

<div class="login fullscreen" class:show>
  <Background />
  <Darken />
  <Topbar />
  <Center />
</div>
