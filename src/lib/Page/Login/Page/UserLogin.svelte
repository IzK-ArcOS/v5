<script lang="ts">
  import { onMount } from "svelte";
  import "../../../../css/login/userlogin.css";
  import { ConnectedServer } from "../../../../ts/api/main";
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
    if (!$ConnectedServer)
      setTimeout(async () => {
        UserData.set(await getUserdata(name));
        UserName.set(name);

        applyState("desktop");
      }, 2000);

    setTimeout(() => {
      show = true;
    }, 10);
  });

  async function cancel() {
    loginUsername.set(undefined);

    applyLoginState("selector");
  }
</script>

<div class="userlogin" class:show>
  {#if !$ConnectedServer}
    <Loading caption="Welcome" />
  {:else}
    <AuthForm bind:authenticating />
  {/if}
</div>

{#if $ConnectedServer && !authenticating}
  <button class="switchuser" class:show on:click={cancel}>Cancel</button>
{/if}
