<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import "@css/login/userlogin.css";
  import Spinner from "../../../../lib/Spinner.svelte";
  import { DevModeOverride } from "$$ts/devmode/props";
  import { ErrorMessages } from "$$ts/errorlogic/app";
  import { applyLoginState, loginUsername } from "$$ts/login/main";
  import { NotificationStore } from "$$ts/notiflogic/main";
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

      applyLoginState("selector");
    }, 2000);
  });
</script>

{#if name && data}
  <div class="userlogin show">
    <ProfilePicture src={pfp} height={151} />
    <h1>{name}</h1>
    <h3><Spinner height={23} />&nbsp;<span>Goodbye</span></h3>
  </div>
{/if}
