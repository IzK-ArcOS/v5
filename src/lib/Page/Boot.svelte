<script lang="ts">
  import { applyState } from "../../ts/state/main";
  import { onMount } from "svelte";
  import "../../css/boot.css";
  import { getServer } from "../../ts/api/server";
  import { testConnection } from "../../ts/api/test";
  import { Logo } from "../../ts/branding";
  import { BugReportData } from "../../ts/bugrep";
  import { Log } from "../../ts/console";
  import { LogLevel } from "../../ts/console/interface";
  import { ArcOSVersion } from "../../ts/env/main";
  import { getAuthcode } from "../../ts/api/authcode";

  let status = "";
  let bootClass = "";
  let targetState = "login";

  let t1 = null;
  let t2 = null;
  let t3 = null;

  let altDown = false;

  onMount(async () => {
    status = "&nbsp;";

    t1 = setTimeout(fadeIn, 500);
    t2 = setTimeout(fadeOut, 4000);
    t3 = setTimeout(redirect, 4750);

    if (!(await checkServer())) status = "Preparing ArcOS";

    document.addEventListener("keydown", altDownCb);
  });

  function altDownCb(e: KeyboardEvent) {
    if (!e.altKey || e.key.toLowerCase() != "a") return;

    altDown = true;
    status = "Loading ArcTerm";
  }

  async function checkServer() {
    const serverHost = getServer();
    const authCode = getAuthcode(serverHost);

    let connected = false;

    if (!serverHost) {
      return;
    }

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
          title: "Boot failed",
          icon: "warning",
          message:
            "ArcOS can't connect to the remote server. Please ensure<br>the server is online, or try again at a later date.",
          button: {
            caption: "Retry",
            action: () => location.reload(),
          },
          source: "Boot",
          details: `Can't connect to server ${serverHost}: none of the modes match`,
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
  <div class="arcterm-load visible">v{ArcOSVersion}</div>
  <div class="center-absolute">
    <img alt="Logo" class="logo" src={Logo()} />
    <div class="slider userdefined">
      <div class="line dark" />
      <div class="subline dark inc" />
      <div class="subline dark dec" />
    </div>
    <p class="status">{@html status}</p>
  </div>
</div>
