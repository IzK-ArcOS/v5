<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/boot.css";
  import { getAuthcode } from "../../ts/api/authcode";
  import { ServerAuthCode } from "../../ts/api/main";
  import { getAllServers, getServer } from "../../ts/api/server";
  import { testConnection } from "../../ts/api/test";
  import { BootFail } from "../../ts/boot/fail";
  import { Logo } from "../../ts/branding";
  import { Log } from "../../ts/console";
  import { LogLevel } from "../../ts/console/interface";
  import { ArcOSVersion } from "../../ts/env/main";
  import sleep from "../../ts/sleep";
  import { applyState } from "../../ts/state/main";
  import ApiReveal from "../APIReveal.svelte";

  let status = "";
  let bootClass = "";
  let targetState = "login";
  let loadingArcTerm = false;
  let progress = false;

  onMount(async () => {
    status = "Press any key to start";

    document.addEventListener("keydown", startBooting, { once: true });
    document.addEventListener("keydown", arcTermShortcut, { once: true });

    await sleep(500);

    bootClass = "fadein";
  });

  async function startBooting() {
    status = "&nbsp;";
    progress = true;

    if (!(await checkServer())) status = "Preparing ArcOS";

    await redirect();
  }

  function arcTermShortcut(e: KeyboardEvent) {
    if (!e.altKey || e.key.toLowerCase() != "a") return;

    loadingArcTerm = true;
    status = "Loading ArcTerm";
  }

  async function checkServer() {
    const serverHost = getServer();
    const authCode = getAuthcode(serverHost);

    if (!serverHost) return;

    if (authCode) status = "Connecting Securely";

    const connected = await testConnection(serverHost, authCode);

    if (!connected) {
      bootClass = "fadeout";

      return BootFail(serverHost);
    }

    return connected;
  }

  async function redirect() {
    Log({
      level: LogLevel.info,
      source: "Boot.svelte",
      msg: "Redirecting",
    });

    await sleep(2000);
    bootClass = "fadeout";
    await sleep(750);
    applyState(loadingArcTerm ? "arcterm" : targetState);
  }
</script>

<div class="{bootClass} boot fullscreen">
  <div class="arcterm-load visible">
    v{ArcOSVersion} - {$ServerAuthCode ? "Private" : "Public"} - {getAllServers()
      .length} servers - current: <ApiReveal />
  </div>
  <div class="center">
    <img alt="Logo" class="logo" src={Logo()} />
    <div class="slider userdefined">
      {#if progress}
        <div class="line dark" />
        <div class="subline dark inc" />
        <div class="subline dark dec" />
      {/if}
    </div>
    <p class="status">{@html status}</p>
  </div>
</div>
