<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/boot.css";
  import { getAuthcode } from "../../ts/api/authcode";
  import { ServerAuthCode } from "../../ts/api/main";
  import { getAllServers, getServer } from "../../ts/api/server";
  import { testConnection } from "../../ts/api/test";
  import { Logo } from "../../ts/branding";
  import { BugReportData } from "../../ts/bugrep";
  import { Log } from "../../ts/console";
  import { LogLevel } from "../../ts/console/interface";
  import { ArcOSVersion } from "../../ts/env/main";
  import { applyState } from "../../ts/state/main";
  import ApiReveal from "../APIReveal.svelte";
  import { D } from "../../ts/language/main";
  import L from "../Language/L.svelte";

  let status = "";
  let bootClass = "";
  let targetState = "login";

  let t1 = null;
  let t2 = null;
  let t3 = null;

  let altDown = false;
  let progressBar = false;

  onMount(async () => {
    status = D("boot.keyPressWait");

    t1 = setTimeout(fadeIn, 500);

    document.addEventListener("keydown", start, { once: true });
  });

  async function start() {
    status = "&nbsp;";
    progressBar = true;
    t2 = setTimeout(fadeOut, 4000);
    t3 = setTimeout(redirect, 4750);

    if (!(await checkServer())) status = D("boot.preparing");

    document.addEventListener("keydown", altDownCb);
  }

  function altDownCb(e: KeyboardEvent) {
    if (!e.altKey || e.key.toLowerCase() != "a") return;

    altDown = true;
    status = D("boot.arcterm");
  }

  async function checkServer() {
    const serverHost = getServer();
    const authCode = getAuthcode(serverHost);

    let connected = false;

    if (!serverHost) {
      return;
    }

    if (authCode) status = D("boot.connectSecure");

    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);

    setTimeout(fadeIn, 120);

    connected = await testConnection(serverHost, authCode);

    if (!connected) {
      fadeOut();
      return BugReportData.set([
        true,
        {
          title: D("boot.failed.title"),
          icon: "warning",
          message: D("boot.failed.message"),
          button: {
            caption: D("boot.failed.retry"),
            action: () => location.reload(),
          },
          source: D("boot"),
          details: D("boot.failed.details"),
        },
      ]);
    }

    setTimeout(fadeOut, 2000);
    setTimeout(redirect, 2750);

    return connected;
  }

  function fadeOut() {
    Log({
      level: LogLevel.info,
      source: "Boot.svelte",
      msg: "Fade-out",
    });

    bootClass = "fadeout";
  }

  function fadeIn() {
    Log({
      level: LogLevel.info,
      source: "Boot.svelte",
      msg: "Fade-in",
    });

    bootClass = "fadein";
  }

  async function redirect() {
    Log({
      level: LogLevel.info,
      source: "Boot.svelte",
      msg: "Redirecting",
    });

    removeEventListener("keydown", altDownCb);

    applyState(altDown ? "arcterm" : targetState);
  }
</script>

<div class="{bootClass} boot fullscreen">
  <div class="arcterm-load visible">
    <L
      id="boot.detailStr"
      inliners={[
        ArcOSVersion,
        $ServerAuthCode ? D("server.private") : D("server.public"),
        getAllServers().length,
      ]}
    />
    <ApiReveal />
  </div>
  <div class="center">
    <img alt="Logo" class="logo" class:color={progressBar} src={Logo()} />
    <div class="slider userdefined">
      {#if progressBar}
        <div class="line dark" />
        <div class="subline dark inc" />
        <div class="subline dark dec" />
      {/if}
    </div>
    <p class="status">{@html status}</p>
  </div>
</div>
