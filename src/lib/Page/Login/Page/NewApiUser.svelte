<script lang="ts">
  import pfp from "../../../../assets/pfp/null.png";
  import { apiCall, ConnectedServer } from "../../../../ts/api/main";
  import { applyLoginState } from "../../../../ts/login/main";

  let username = "";
  let password = "";

  let loading = false;

  async function createAccount() {
    loading = true;
    const req = await apiCall($ConnectedServer, "user/create", {}, null, {
      username,
      password,
    });

    setTimeout(() => {
      location.reload();
    }, 2000);
  }
</script>

<div class="userlogin newuser">
  <img src={pfp} alt="pfp" />
  <h1>{username || "New user"}</h1>
  <form>
    <input
      type="text"
      placeholder="Username"
      class="block"
      bind:value={username}
    />
  </form>
  <div class="input-wrapper">
    <form>
      <input
        type="password"
        placeholder="Password"
        class="block"
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
</div>

{#if $ConnectedServer && !loading}
  <button class="switchuser" on:click={() => applyLoginState("selector")}
    >Cancel</button
  >
{/if}
