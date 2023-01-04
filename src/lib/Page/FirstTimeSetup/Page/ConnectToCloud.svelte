<script lang="ts">
  import "../../../../css/fts/page/connecttocloud.css";
  import { testConnection, TEST_MODES } from "../../../../ts/api/test";
  import { applyFTSState } from "../../../../ts/fts/main";
  import Nav from "../Nav.svelte";
  import ServerConnect from "./ServerConnect.svelte";
  import connectIcon from "../../../../assets/fts/connect.svg";

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

<div class="header centered">
  <img src={connectIcon} alt="Mode" />
  <h1>Time to get connected</h1>
  <p class="subtitle">Enter the hostname of your ArcAPI:</p>
</div>
<input
  class="fullwidth centered"
  placeholder="Server name"
  bind:value={server}
/>
<button class="fullwidth option centered" disabled={!server} on:click={connect}
  >Connect to server</button
>
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
