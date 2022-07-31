<script lang="ts">
  import "../../../../css/login/userlogin.css";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { UserData, UserName } from "../../../../ts/userlogic/interfaces";
  import { getUserdata } from "../../../../ts/userlogic/main";
  import profile from "../../../../assets/pfp/null.png";
  import Spinner from "../../../../lib/Spinner.svelte";
  import { applyState } from "../../../../ts/state/main";
  import { applyLoginState } from "../../../../ts/login/main";

  let name: string;
  let data: UserData;

  onMount(() => {
    name = get(UserName);
    data = getUserdata(name);

    setTimeout(() => {
      UserName.set(undefined);

      applyState("boot");

      setTimeout(() => {
        applyLoginState("selector");
      }, 250);
    }, 2000);
  });
</script>

<div class="userlogin">
  <img src={profile} alt="pfp" />
  <h1>{name || "ArcOS"}</h1>
  <h3><Spinner height={23} />&nbsp;<span>Restarting </span></h3>
</div>
