<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import "../../../../css/login/userlogin.css";
  import Spinner from "../../../../lib/Spinner.svelte";
  import { applyLoginState, loginUsername } from "../../../../ts/login/main";
  import { applyState } from "../../../../ts/state/main";
  import { UserData, UserName } from "../../../../ts/userlogic/interfaces";
  import { getUserdata } from "../../../../ts/userlogic/main";
  import { getProfilePicture } from "../../../../ts/userlogic/pfp";

  let name: string;
  let data: UserData;
  let pfp = "";

  onMount(async () => {
    name = get(loginUsername);
    if (name) {
      data = await getUserdata(name);

      pfp = getProfilePicture(parseInt(data.acc.profilePicture as string));

      setTimeout(async () => {
        UserData.set(await getUserdata(name));
        UserName.set(name);

        applyState("desktop");
      }, 2000);
    } else {
      applyLoginState("selector");
    }
  });
</script>

{#if name && data}
  <div class="userlogin">
    <img src={pfp} alt="pfp" />
    <h1>{name}</h1>
    <h3><Spinner height={23} />&nbsp;<span>Welcome</span></h3>
  </div>
{/if}
