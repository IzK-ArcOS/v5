<script lang="ts">
  import { onMount } from "svelte";
  import "@css/login.css";
  import { loginUsingCreds } from "$$ts/api/getter";
  import { apiCall, ConnectedServer } from "$$ts/api/main";
  import {
    applyLoginState,
    CurrentLoginState,
    loginUsername,
  } from "$$ts/login/main";
  import { applyState } from "$$ts/state/main";
  import { UserData, UserName, UserToken } from "$$ts/userlogic/interfaces";
  import { getUsers } from "$$ts/userlogic/main";
  import Background from "./Login/Background.svelte";
  import Center from "./Login/Center.svelte";
  import Darken from "./Login/Darken.svelte";
  import Topbar from "./Login/Topbar.svelte";

  let show = false;

  onMount(async () => {
    const users = await getUsers();
    const remembered = localStorage.getItem("arcos-remembered-token");

    if (!$CurrentLoginState)
      applyLoginState(remembered ? "autologin" : "selector");

    if (
      remembered &&
      $CurrentLoginState.key != "shutdown" &&
      $CurrentLoginState.key != "restart"
    ) {
      const userdata = await loginUsingCreds(remembered);

      if (!userdata) {
        applyLoginState("selector");

        localStorage.removeItem("arcos-remembered-token");
        show = true;

        return;
      }

      show = true;

      UserData.set(userdata);

      setTimeout(() => {
        applyState("desktop");
      }, 2000);
    }

    if (!remembered) show = true;

    if (!Object.keys(users).length && !remembered) {
      if (!$ConnectedServer) {
        applyState("fts");
      } else {
        applyLoginState("newapiuser");
      }

      return;
    }
  });
</script>

<div class="login fullscreen" class:show>
  <Background />
  <Darken />
  <Topbar />
  <Center />
</div>
