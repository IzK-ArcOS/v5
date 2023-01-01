<script lang="ts">
  import { testConnection } from "../../../../ts/api/test";
  import { applyFTSState } from "../../../../ts/fts/main";
  import Nav from "../Nav.svelte";

  let server = "";

  async function connect() {
    const testSuccess = await testConnection(server);

    if (testSuccess) {
      localStorage.setItem("arcos-server", server);

      applyFTSState("finish");
    } else {
      alert("oh");
    }
  }
</script>

<div class="header">
  <h1>Let's get you online.</h1>
  <p class="subtitle">Exciting stuff</p>
</div>
<br />
<p>Enter the ArcOS server url:</p>
<p>
  <input class="fullwidth" placeholder="Server name" bind:value={server} />
  <button class="fullwidth option" disabled={!server} on:click={connect}
    >Connect to server</button
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
