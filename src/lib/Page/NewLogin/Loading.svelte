<script lang="ts">
  import { onMount } from "svelte";
  import type { Login } from "../../../ts/newlogin/main";
  import ProfilePicture from "../../ProfilePicture.svelte";
  import Spinner from "../../Spinner.svelte";
  import { getUserPfp } from "../../../ts/api/pfp";

  export let runtime: Login;
  export let caption = "Welcome";

  let pfp = "";
  let username = "ArcOS";

  onMount(() =>
    runtime.UserName.subscribe(async (v) => {
      if (!v) return;

      username = v;
      pfp = await getUserPfp(v);
    })
  );
</script>

<div class="login-loading">
  <ProfilePicture src={pfp} height={151} />
  <h1>{username}</h1>
  <h3><Spinner height={23} />&nbsp;<span>{caption}</span></h3>
</div>
