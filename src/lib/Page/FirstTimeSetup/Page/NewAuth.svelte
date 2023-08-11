<script lang="ts">
  import { onMount } from "svelte";
  import account from "../../../../assets/fts/account.svg";
  import { generateCredToken } from "../../../../ts/api/cred";
  import { loginUsingCreds } from "../../../../ts/api/getter";
  import { ConnectedServer, apiCall } from "../../../../ts/api/main";
  import { applyFTSState } from "../../../../ts/fts/main";
  import { UserData, UserName } from "../../../../ts/userlogic/interfaces";
  import { getUsers } from "../../../../ts/userlogic/main";
  import Spinner from "../../../Spinner.svelte";
  import { Busy } from "../../../../ts/env/main";
  import { createUser } from "../../../../ts/userlogic/mutate";

  let username = "";
  let password = "";
  let error = false;
  let working = false;
  let loading = true;

  onMount(async () => {
    loading = true;
    Busy.set(true);

    const users = await getUsers();

    if (!Object.entries(users).length) applyFTSState("finish");

    loading = false;
    Busy.set(false);
  });

  function changeServer() {
    applyFTSState("connecttocloud");
  }

  async function createAccount(e?: Event) {
    if (e) e.preventDefault();

    if (!username || !password || working) return false;

    Busy.set(true);
    working = true;

    const data = await createUser(username, password);

    if (!data) {
      error = true;
      Busy.set(false);
      working = false;

      setTimeout(() => {
        error = false;
      }, 1000);

      return;
    }

    UserData.set(data);
    UserName.set(username);

    applyFTSState("finish");

    return false;
  }
</script>

{#if !loading}
  <div class="header centered">
    <img src={account} alt="Login" />
    <h1>Hello, stranger!</h1>
    <p class="subtitle">Let's get you an account</p>
  </div>

  <input
    type="text"
    class="fullwidth centered"
    class:error
    placeholder="Username"
    bind:value={username}
  />
  <div class="input-wrap">
    <input
      type="password"
      class="fullwidth centered"
      class:error
      placeholder="Password"
      bind:value={password}
    />
    <button
      class="login material-icons-round"
      disabled={!username || !password || working}
      on:click={createAccount}
    >
      {#if working}
        <Spinner height={16} />
      {:else}
        arrow_forward_ios
      {/if}
    </button>
  </div>
{/if}

<style scoped>
  button.login {
    width: 36px;
    height: 36px;
    border-radius: 50% !important;
    padding: 0 !important;
    font-size: 18px;
  }

  div.input-wrap {
    display: flex;
    margin: 5px auto;
    width: 65%;
  }

  div.input-wrap input {
    margin: 0;
    min-width: 100%;
  }

  input.error {
    border-bottom: var(--clr-red-fg) 2px solid !important;
  }

  div.input-wrap button {
    min-width: 36px;
    margin-left: 10px;
  }
</style>
