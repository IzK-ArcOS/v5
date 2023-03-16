<script lang="ts">
  import { onMount } from "svelte";
  import { getUserPfp } from "../../../../../ts/api/pfp";
  import { loginUsername } from "../../../../../ts/login/main";
  import { UserData, UserName } from "../../../../../ts/userlogic/interfaces";
  import { getUserdata } from "../../../../../ts/userlogic/main";
  import systemIcon from "../../../../../assets/systemIcon.svg";
  import def from "../../../../../assets/pfp/null.png";
  import ProfilePicture from "../../../../ProfilePicture.svelte";
  import Spinner from "../../../../Spinner.svelte";

  export let caption: string;
  export let username: string = "";

  let name = "";
  let data: UserData;
  let pfp = "";

  onMount(async () => {
    name = $loginUsername || $UserName || username;
    data = await getUserdata(name);
    pfp = await getUserPfp(name);

    if (pfp == def) pfp = systemIcon;
  });
</script>

{#if data && pfp}
  <div class="userlogin show">
    <ProfilePicture src={pfp} height={151} />
    <h1>{name}</h1>
    <h3><Spinner height={23} />&nbsp;<span>{caption}</span></h3>
  </div>
{/if}
