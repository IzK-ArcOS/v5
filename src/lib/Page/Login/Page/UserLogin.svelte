<script lang="ts">
  import "../../../../css/login/userlogin.css";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { loginUsername } from "../../../../ts/login/main";
  import type { UserData } from "../../../../ts/userlogic/interfaces";
  import { getUserdata } from "../../../../ts/userlogic/main";
  import profile from "../../../../assets/pfp/null.png";
import Spinner from "../../../../lib/Spinner.svelte";

  let name: string;
  let data: UserData;

  onMount(() => {
    name = get(loginUsername);
    data = getUserdata(name);
  });
</script>

{#if name && data}
  <div class="userlogin">
    <img src={profile} alt="pfp" />
    <h1>Hi, {name}!</h1>
    <Spinner height={50}/>
  </div>
{/if}
