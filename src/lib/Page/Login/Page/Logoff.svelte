<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import "../../../../css/login/userlogin.css";
  import Spinner from "../../../../lib/Spinner.svelte";
  import { applyLoginState } from "../../../../ts/login/main";
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

      applyLoginState("selector");
    }, 2000);
  });
</script>

{#if name && data}
  <div class="userlogin">
    <img src={pfp} alt="pfp" />
    <h1>{name}</h1>
    <h3><Spinner height={23} />&nbsp;<span>Goodbye</span></h3>
  </div>
{/if}
