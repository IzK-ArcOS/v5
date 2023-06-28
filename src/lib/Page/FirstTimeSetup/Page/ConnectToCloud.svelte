<script lang="ts">
  import connectIcon from "../../../../assets/fts/connect.svg";
  import "../../../../css/fts/page/connecttocloud.css";
  import { addServer } from "../../../../ts/api/server";
  import { testConnection } from "../../../../ts/api/test";
  import { applyFTSState } from "../../../../ts/fts/main";
  import Nav from "../Nav.svelte";

  let server = "";

  let connecting = false;

  let connectionError = false;

  async function connect() {
    connecting = true;
    connectionError = false;

    const testSuccess = await testConnection(server);

    if (testSuccess) {
      addServer(server);

      applyFTSState("authform");
    } else {
      connectionError = true;
    }

    connecting = false;
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
<button
  class="fullwidth option centered"
  disabled={!server || connecting}
  on:click={connect}
>
  {#if !connecting}Connect to server{:else}Connecting...{/if}
</button>
{#if connectionError}
  <p class="fullwidth centered connect-error">
    <span class="material-icons-round">error</span>Connection to ArcAPI failed!
  </p>
{/if}
<Nav
  data={{
    back: {
      disabled: false,
      redir: "license",
    },
    forw: {
      disabled: true,
      redir: "authform",
    },
    prog: {
      max: 4,
      val: 3,
    },
  }}
/>
