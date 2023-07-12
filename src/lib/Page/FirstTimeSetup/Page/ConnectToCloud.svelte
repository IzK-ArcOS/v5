<script lang="ts">
  import connectIcon from "../../../../assets/fts/connect.svg";
  import "../../../../css/fts/page/connecttocloud.css";
  import { setAuthcode } from "../../../../ts/api/authcode";
  import { addServer } from "../../../../ts/api/server";
  import { testConnection } from "../../../../ts/api/test";
  import { applyFTSState } from "../../../../ts/fts/main";
  import { D } from "../../../../ts/language/main";
  import { ArcSoundBus } from "../../../../ts/sound/main";
  import L from "../../../Language/L.svelte";
  import Nav from "../Nav.svelte";

  let server = "";
  let connecting = false;
  let connectionError = false;
  let authCode = "";

  async function connect() {
    connecting = true;
    connectionError = false;

    const testSuccess = await testConnection(server.trim(), authCode.trim());

    if (testSuccess) {
      addServer(server.trim());
      setAuthcode(server.trim(), authCode.trim());

      applyFTSState("authmode");
    } else {
      ArcSoundBus.playSound("arcos.dialog.error");
      connectionError = true;
    }

    connecting = false;
  }
</script>

<div class="header centered">
  <img src={connectIcon} alt="Mode" />
  <h1><L id="fts.ctc.header" /></h1>
  <p class="subtitle"><L id="fts.ctc.subtitle" /></p>
</div>
<input
  class="fullwidth centered"
  placeholder={D("fts.ctc.serverPlaceholder")}
  bind:value={server}
/>
<input
  class="fullwidth centered"
  placeholder={D("fts.ctc.authCodePlaceholder")}
  bind:value={authCode}
/>
<button
  class="fullwidth option centered"
  disabled={!server || connecting}
  on:click={connect}
>
  {#if !connecting}
    <L id="fts.ctc.continue" />
  {:else}
    <L id="fts.ctc.connecting" />
  {/if}
</button>
{#if connectionError}
  <p class="fullwidth centered connect-error">
    <span class="material-icons-round">error</span>
    <L id="fts.ctc.failure" />
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
