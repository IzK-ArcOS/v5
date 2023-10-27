<script lang="ts">
  import "../../../../css/fts/page/connecttocloud.css";
  import { setAuthcode } from "../../../../ts/api/authcode";
  import { addServer } from "../../../../ts/api/server";
  import { testConnection } from "../../../../ts/api/test";
  import { applyFTSState } from "../../../../ts/fts/main";
  import { ConnectIcon } from "../../../../ts/icon/general";
  import { ArcSoundBus } from "../../../../ts/sound/main";
  import Custom from "./ConnectToCloud/Custom.svelte";
  import Toggle from "./ConnectToCloud/Toggle.svelte";

  let server = "";
  let connecting = false;
  let connectionError = false;
  let authCode = "";
  let foreign = false;

  async function connect() {
    connecting = true;
    connectionError = false;

    const api = foreign ? server.trim() : "community.arcapi.nl";

    const testSuccess = await testConnection(api.trim(), authCode.trim());

    if (testSuccess) {
      addServer(api);
      setAuthcode(api, authCode.trim());

      applyFTSState("finish");
    } else {
      ArcSoundBus.playSound("arcos.dialog.error");
      connectionError = true;
    }

    connecting = false;
  }
</script>

<div class="header centered">
  <img src={ConnectIcon} alt="Mode" />
  <h1>Time to get connected</h1>
  <p class="subtitle">Where does your account live?</p>
</div>
{#if foreign}
  <Custom
    bind:server
    bind:authCode
    {connect}
    bind:connecting
    bind:connectionError
  />
{:else}
  <button
    class="fullwidth centered option"
    disabled={connecting}
    on:click={connect}
  >
    {connecting ? "Hang on..." : "Continue using Community API"}
  </button>
{/if}
<Toggle bind:foreign bind:connectionError />
<!-- <Error {connectionError} /> -->
