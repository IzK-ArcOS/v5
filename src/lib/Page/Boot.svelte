<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/boot.css";
  import { getAuthcode } from "../../ts/api/authcode";
  import { getAllServers, getServer } from "../../ts/api/server";
  import { testConnection } from "../../ts/api/test";
  import { BootFail } from "../../ts/boot/fail";
  import { Logo } from "../../ts/branding";
  import { Log } from "../../ts/console";
  import { ArcOSVersion, Busy } from "../../ts/env/main";
  import sleep from "../../ts/sleep";
  import { applyState } from "../../ts/state/main";
  import ApiReveal from "../APIReveal.svelte";

  let status = "";
  let bootClass = "";
  let targetState = "login";
  let progress = false;
  let running = false;

  onMount(async () => {
    status = "Press a key or click to start";

    document.addEventListener("click", startBooting, { once: true });
    document.addEventListener("keydown", startBooting, { once: true });
    document.addEventListener("keydown", arcTermShortcut);

    await sleep(500);

    bootClass = "fadein";
  });

  async function startBooting() {
    if (running) return;
    running = true;
    status = "&nbsp;";
    progress = true;
    Busy.set(true);

    if (targetState == "serverselect") return await redirect();

    if (!(await checkServer()) && !getAllServers()) status = "Preparing ArcOS";

    await redirect();
  }

  function arcTermShortcut(e: KeyboardEvent) {
    if (!e.key) return;

    const key = e.key.toLowerCase();

    if (key == "f8" || targetState == "serverselect")
      return (targetState = "serverselect");

    if (!e.altKey || key != "a") return;

    targetState = "arcterm";
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

      return targetState == "serverselect" ? false : BootFail(serverHost);
    }

    return connected;
  }

  async function redirect() {
    Log("Boot.svelte", "Redirecting");

    await sleep(2000);
    bootClass = "fadeout";
    await sleep(750);
    applyState(targetState);
    Busy.set(false);
  }
</script>

<div class="{bootClass} boot fullscreen">
  <div class="arcterm-load visible">
    v{ArcOSVersion} - <ApiReveal />
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="ssnotice visible" on:click={() => (targetState = "serverselect")}>
    {targetState == "serverselect"
      ? "Please wait..."
      : "Press F8 to select server"}
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
