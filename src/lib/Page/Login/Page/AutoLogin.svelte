<script lang="ts">
  import { onMount } from "svelte";
  import "@css/login/userlogin.css";
  import Spinner from "../../../../lib/Spinner.svelte";
  import { loginUsername } from "$$ts/login/main";
  import type { UserData } from "$$ts/userlogic/interfaces";
  import { getUserdata } from "$$ts/userlogic/main";
  import { getProfilePicture } from "$$ts/userlogic/pfp";
  import ProfilePicture from "../../../ProfilePicture.svelte";

  let data: UserData;

  let pfp = "";

  onMount(async () => {
    data = await getUserdata($loginUsername);

    pfp = getProfilePicture(data.acc.profilePicture);
  });
</script>

{#if data}
  <div class="userlogin show">
    <ProfilePicture src={pfp} height={151} />
    <h1>{$loginUsername}</h1>
    <h3><Spinner height={23} />&nbsp;<span>Welcome</span></h3>
  </div>
{/if}
