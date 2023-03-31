<script lang="ts">
  import account from "../../../../assets/fts/account.svg";
  import { onMount } from "svelte";
  import { getUsers } from "../../../../ts/userlogic/main";
  import Nav from "../Nav.svelte";
  import { ConnectedServer } from "../../../../ts/api/main";
  import { applyFTSState } from "../../../../ts/fts/main";
  import { loginUsingCreds } from "../../../../ts/api/getter";
  import { generateCredToken } from "../../../../ts/api/cred";

  let username = "";
  let password = "";
  let error = false;

  function changeServer() {
    ConnectedServer.set(undefined);
    localStorage.removeItem("arcos-server");

    applyFTSState("connecttocloud");
  }

  async function login() {
    const token = generateCredToken({ username, password });
    const req = await loginUsingCreds(token);

    if (!req) {
      error = true;

      setTimeout(() => {
        error = false;
      }, 1000);

      return;
    }

    localStorage.setItem("arcos-remembered-token", token);
    applyFTSState("finish");
  }
</script>

<div class="header centered">
  <img src={account} alt="Login" />
  <h1>Who are you?</h1>
  <p class="subtitle">Let's get you logged in</p>
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
    disabled={!username || !password}
    on:click={login}
  >
    arrow_forward_ios
  </button>
</div>
<button class="flat centered" on:click={changeServer}>Change server</button>

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
