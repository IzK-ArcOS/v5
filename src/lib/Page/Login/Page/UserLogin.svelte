<script lang="ts">
  import "../../../../css/login/userlogin.css";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { applyLoginState, loginUsername } from "../../../../ts/login/main";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import { getUserdata } from "../../../../ts/userlogic/main";
  import profile from "../../../../assets/pfp/null.png";
  import Spinner from "../../../../lib/Spinner.svelte";
import { applyState } from "../../../../ts/state/main";

  let name: string;
  let data: UserData;

  onMount(() => {
    name = get(loginUsername);
    if (name) {
      data = getUserdata(name);

      setTimeout(() => {
        UserData.set(getUserdata(name));

        applyState("desktop");
      }, 2000);
    } else {
      applyLoginState("selector");
    }
  });
</script>

{#if name && data}
  <div class="userlogin">
    <img src={profile} alt="pfp" />
    <h1>{name}</h1>
    <h3><Spinner height={23} />&nbsp;<span>Welcome</span></h3>
  </div>
{/if}
