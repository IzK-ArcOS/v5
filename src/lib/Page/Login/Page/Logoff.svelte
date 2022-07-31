<script lang="ts">
  import "../../../../css/login/userlogin.css";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { applyLoginState } from "../../../../ts/login/main";
  import { UserData, UserName } from "../../../../ts/userlogic/interfaces";
  import { getUserdata } from "../../../../ts/userlogic/main";
  import profile from "../../../../assets/pfp/null.png";
  import Spinner from "../../../../lib/Spinner.svelte";

  let name: string;
  let data: UserData;

  onMount(() => {
    name = get(UserName);
    data = getUserdata(name);

    setTimeout(() => {
      UserName.set(undefined);

      applyLoginState("selector");
    }, 2000);
  });
</script>

{#if name && data}
  <div class="userlogin">
    <img src={profile} alt="pfp" />
    <h1>{name}</h1>
    <h3><Spinner height={23} />&nbsp;<span>Goodbye</span></h3>
  </div>
{/if}
