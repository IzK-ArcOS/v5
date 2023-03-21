<script lang="ts">
  import { onMount } from "svelte";
  import "../../../../css/login/userlogin.css";
  import { applyLoginState, loginUsername } from "../../../../ts/login/main";
  import { applyState } from "../../../../ts/state/main";
  import { UserData, UserName } from "../../../../ts/userlogic/interfaces";
  import { getUserdata } from "../../../../ts/userlogic/main";
  import Loading from "./Content/Loading.svelte";
  import AuthForm from "./UserLogin/AuthForm.svelte";

  let name: string;
  let authenticating = false;
  let show = false;

  onMount(async () => {
    setTimeout(() => {
      show = true;
    }, 10);
  });
</script>

<div class="userlogin" class:show>
  <AuthForm bind:authenticating />
</div>
