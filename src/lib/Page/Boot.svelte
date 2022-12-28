<script lang="ts">
  import { applyState } from "../../ts/state/main";

  import { onMount } from "svelte";
  import logo from "../../assets/systemIcon.svg";
  import "../../css/boot.css";
  import { Log, LogLevel } from "../../ts/console";
  import { userDataKey } from "../../ts/env/main";
  import { getUsers } from "../../ts/userlogic/main";

  let status = "";
  let bootClass = "";
  let targetState = "login";

  onMount(() => {
    status = "&nbsp;";

    if (!localStorage.getItem(userDataKey)) status = "Preparing ArcOS";

    setTimeout(fadeIn, 500);
    setTimeout(fadeOut, 4000);
    setTimeout(redirect, 4750);
  });

  function fadeOut() {
    Log({
      level: LogLevel.info,
      source: "boot",
      msg: "Fade-out",
    });

    bootClass = "fadeout";
  }

  function fadeIn() {
    Log({
      level: LogLevel.info,
      source: "boot",
      msg: "Fade-in",
    });

    bootClass = "fadein";
  }

  function redirect() {
    Log({
      level: LogLevel.info,
      source: "boot",
      msg: "Redirecting",
    });

    const noUsers = Object.keys(getUsers()).length == 0;

    applyState(targetState);
  }
</script>

<div class="{bootClass} boot fullscreen">
  <div class="center-absolute">
    <img alt="Logo" class="logo" src={logo} />
    <div class="slider userdefined">
      <div class="line dark" />
      <div class="subline dark inc" />
      <div class="subline dark dec" />
    </div>
    <p class="status">{@html status}</p>
  </div>
</div>
