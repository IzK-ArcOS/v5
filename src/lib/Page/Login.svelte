<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/login.css";
  import { apiCall, ConnectedServer } from "../../ts/api/main";
  import { applyLoginState, CurrentLoginState } from "../../ts/login/main";
  import { applyState } from "../../ts/state/main";
  import { UserData, UserName, UserToken } from "../../ts/userlogic/interfaces";
  import { getUsers } from "../../ts/userlogic/main";
  import Background from "./Login/Background.svelte";
  import Center from "./Login/Center.svelte";
  import Darken from "./Login/Darken.svelte";
  import Topbar from "./Login/Topbar.svelte";

  let show = false;

  onMount(async () => {
    const users = await getUsers();
    const remembered = localStorage.getItem("arcos-remembered-token");

    setTimeout(async () => {
      if (
        remembered &&
        $CurrentLoginState.key != "shutdown" &&
        $CurrentLoginState.key != "restart"
      ) {
        let [name, password] = atob(remembered).split(":");

        let req = await apiCall($ConnectedServer, "auth", {}, null, {
          username: name,
          password,
        });

        if (!req.valid) return (show = true);

        UserToken.set(req.data.token);
        UserName.set(name);

        req = await apiCall(
          $ConnectedServer,
          `user/properties`,
          {},
          $UserToken,
          null
        );

        if (!req.valid) return (show = true);

        UserData.set(req);

        applyState("desktop");
      } else show = true;

      if (!remembered) show = true;
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
