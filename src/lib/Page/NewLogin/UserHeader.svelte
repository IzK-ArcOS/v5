<script lang="ts">
  import { onMount } from "svelte";
  import ProfilePicture from "../../ProfilePicture.svelte";
  import type { Login } from "../../../ts/newlogin/main";
  import { getUserPfp } from "../../../ts/api/pfp";

  export let runtime: Login;

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

<ProfilePicture src={pfp} height={151} />
<h1>{username}</h1>
