<script lang="ts">
  import account from "@assets/fts/account.svg";
  import { applyFTSState } from "../../../../ts/fts/main";

  import { createUser } from "../../../../ts/userlogic/main";

  import Nav from "../Nav.svelte";

  let username = "";

  function cre() {
    createUser(username);

    applyFTSState("finish");
  }
</script>

<div class="header centered">
  <img src={account} alt="Mode" />
  <h1>Let's create a user</h1>
  <p class="subtitle">This will be the first account.</p>
</div>
<p>
  <input
    class="fullwidth centered"
    placeholder="Username"
    bind:value={username}
  />
  <button class="fullwidth option centered" disabled={!username} on:click={cre}
    >Create Account</button
  >
</p>
<Nav
  data={{
    back: {
      disabled: false,
      redir: "servconn",
    },
    forw: {
      disabled: true,
      redir: "finish",
    },
    prog: {
      max: 4,
      val: 3,
    },
  }}
/>
