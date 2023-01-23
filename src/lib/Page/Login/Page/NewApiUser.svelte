<script lang="ts">
  import { onMount } from "svelte";
  import pfp from "../../../../assets/pfp/null.png";
  import { apiCall, ConnectedServer } from "../../../../ts/api/main";
  import { applyLoginState } from "../../../../ts/login/main";
  import { applyState } from "../../../../ts/state/main";
  import {
    UserData,
    UserName,
    UserToken,
  } from "../../../../ts/userlogic/interfaces";
  import Spinner from "../../../Spinner.svelte";

  let username = "";
  let password = "";
  let loading = false;
  let show = false;

  async function createAccount() {
    loading = true;
    await apiCall($ConnectedServer, "user/create", {}, null, {
      username,
      password,
    });

    let req = await apiCall($ConnectedServer, "auth", {}, null, {
      username,
      password,
    });

    if (!req.valid) {
      loading = false;

      return;
    }

    UserToken.set(req.data.token);

    req = await apiCall(
      $ConnectedServer,
      `user/properties`,
      {},
      $UserToken,
      null
    );

    if (!req.valid) return false;

    UserData.set(req);
    UserName.set(username);

    applyState("desktop");
  }

  onMount(() => {
    setTimeout(() => {
      show = true;
    });
  });
</script>

<div class="userlogin newuser" class:show>
  <img src={pfp} alt="pfp" />
  <h1>{username || "New user"}</h1>
  {#if !loading}
    <form>
      <input
        type="text"
        placeholder="Username"
        class="block"
        disabled={loading}
        bind:value={username}
      />
    </form>
    <div class="input-wrapper">
      <form>
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
        class="createbutton material-icons"
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
