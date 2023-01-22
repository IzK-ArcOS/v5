<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import "../../../../css/login/userlogin.css";
  import Spinner from "../../../../lib/Spinner.svelte";
  import { DevModeOverride } from "../../../../ts/devmode/props";
  import { ErrorMessages } from "../../../../ts/errorlogic/app";
  import { loginUsername } from "../../../../ts/login/main";
  import { NotificationStore } from "../../../../ts/notiflogic/main";
  import { applyState } from "../../../../ts/state/main";
  import { UserData, UserName } from "../../../../ts/userlogic/interfaces";
  import { getUserdata } from "../../../../ts/userlogic/main";
  import { getProfilePicture } from "../../../../ts/userlogic/pfp";

  let name: string;
  let data: UserData;

  let pfp = "";

  onMount(async () => {
    name = get(UserName);
    data = await getUserdata(name);

    pfp = getProfilePicture(parseInt(data.acc.profilePicture as string));

    setTimeout(() => {
      UserName.set(undefined);
      loginUsername.set(undefined);
      NotificationStore.set({});
      ErrorMessages.set([]);
      DevModeOverride.set(false);

      applyState("turnedoff");
    }, 2000);
  });
</script>

<div class="userlogin show">
  <img src={pfp} alt="pfp" />
  <h1>{name || "ArcOS"}</h1>
  <h3><Spinner height={23} />&nbsp;<span>Shutting down</span></h3>
</div>
