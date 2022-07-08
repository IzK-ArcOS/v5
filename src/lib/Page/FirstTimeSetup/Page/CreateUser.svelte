<script lang="ts">
import { applyFTSState } from "../../../../ts/fts/main";

import { createUser } from "../../../../ts/userlogic/main";

  import { projName } from "../../../../ts/env/main";
  import Nav from "../Nav.svelte";

  let username = "";
  
  function cre() {
    createUser(username);

    applyFTSState("finish")
  }
</script>

<div class="header">
  <h1>Let's create a user</h1>
  <p class="subtitle">This is the first account.</p>
</div>
<br />
<p>Enter your username.</p>
<p>
  <input class="fullwidth" placeholder="Username" bind:value={username}/>
  <button class="fullwidth option" disabled={!username} on:click={cre}>Create Account</button>
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
