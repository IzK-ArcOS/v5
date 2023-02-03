<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import "@css/login/userlogin.css";
  import Spinner from "../../../../lib/Spinner.svelte";
  import { DevModeOverride } from "$$ts/devmode/props";
  import { ErrorMessages } from "$$ts/errorlogic/app";
  import { applyLoginState, loginUsername } from "$$ts/login/main";
  import { NotificationStore } from "$$ts/notiflogic/main";
  import { applyState } from "$$ts/state/main";
  import { UserData, UserName } from "$$ts/userlogic/interfaces";
  import { getUserdata } from "$$ts/userlogic/main";
  import { getProfilePicture } from "$$ts/userlogic/pfp";
  import ProfilePicture from "../../../ProfilePicture.svelte";

  let name: string;
  let data: UserData;

  let pfp = "";

  onMount(async () => {
    name = get(UserName);
    data = await getUserdata(name);

    pfp = getProfilePicture(data.acc.profilePicture);

    setTimeout(() => {
      UserName.set(undefined);
      loginUsername.set(undefined);
      NotificationStore.set({});
      ErrorMessages.set([]);
      DevModeOverride.set(false);

      applyState("boot");

      setTimeout(() => {
        applyLoginState("selector");
      }, 250);
    }, 2000);
  });
</script>

<div class="userlogin show">
  <ProfilePicture src={pfp} height={151} />
  <h1>{name || "ArcOS"}</h1>
  <h3><Spinner height={23} />&nbsp;<span>Restarting </span></h3>
</div>
