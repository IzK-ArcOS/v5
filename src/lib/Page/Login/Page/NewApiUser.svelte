<script lang="ts">
  import { onMount } from "svelte";
  import pfp from "../../../../assets/pfp/null.png";
  import { generateCredToken } from "../../../../ts/api/cred";
  import { loginUsingCreds } from "../../../../ts/api/getter";
  import { apiCall, ConnectedServer } from "../../../../ts/api/main";
  import { applyLoginState } from "../../../../ts/login/main";
  import { applyState } from "../../../../ts/state/main";
  import {
    UserData,
    UserName,
    UserToken,
  } from "../../../../ts/userlogic/interfaces";
  import ProfilePicture from "../../../ProfilePicture.svelte";
  import Spinner from "../../../Spinner.svelte";

  let username = "";
  let password = "";
  let loading = false;
  let show = false;

  async function createAccount(e?: Event) {
    if (e) e.preventDefault();

    if (!username || !password || loading) return false;

    loading = true;

    await apiCall($ConnectedServer, "user/create", {}, null, {
      username,
      password,
    });

    const userdata = await loginUsingCreds(
      generateCredToken({ username, password })
    );

    if (!userdata) return (loading = false);

    UserData.set(userdata);
    UserName.set(username);

    applyState("desktop");

    return false;
  }

  onMount(() => {
    setTimeout(() => {
      show = true;
    });
  });
</script>

<div class="userlogin newuser" class:show>
  <ProfilePicture src={pfp} height={151} />
  <h1>{username || "New user"}</h1>
  {#if !loading}
    <form on:submit={createAccount}>
      <input
        type="text"
        placeholder="Username"
        class="block"
        disabled={loading}
        bind:value={username}
      />
    </form>
    <div class="input-wrapper">
      <form on:submit={createAccount}>
        <input
          type="password"
          placeholder="Password"
          class="block"
          disabled={loading || !username}
          bind:value={password}
        />
      </form>
      <button
        on:click={createAccount}
        disabled={loading || !username || !password}
        class="createbutton material-icons-round"
      >
        arrow_forward_ios
      </button>
    </div>
  {:else}
    <h3><Spinner height={23} />&nbsp;<span>Welcome</span></h3>
  {/if}
</div>

{#if $ConnectedServer && !loading}
  <button
    class="switchuser"
    class:show
    on:click={() => applyLoginState("selector")}>Cancel</button
  >
{/if}
