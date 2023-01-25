<script lang="ts">
  import logo from "../../../../assets/systemIcon.svg";
  import "../../../../css/desktop/apps/settings/about.css";
  import { DevModeOverride } from "../../../../ts/devmode/props";
  import { errorMessage } from "../../../../ts/errorlogic/main";
  import { UserData, UserName } from "../../../../ts/userlogic/interfaces";
  import Section from "../Section.svelte";

  function enableDevmode() {
    $UserData.devmode = true;

    errorMessage(
      `Welcome to the developers, ${$UserName}!`,
      "It's always exciting to see when someone joins our developer mode. You might be wondering where you can open this mode. Believe me, it's quite simple. Click the red bar at the top of ArcOS to open devmode. Click the topbar in devmode to close it again. Have fun exploring ArcOS!<br/><br/>Note: DevMode will close if you log out because it's user-specific.",
      null,
      "SettingsApp",
      { caption: "Close", action: () => {} }
    );
  }

  function disableDevmode() {
    $UserData.devmode = false;

    DevModeOverride.set(false);
  }
</script>

<div class="about-page">
  <div class="product">
    <div class="about">
      Thank you for using ArcOS. This project aims to reach the limits of
      creating an OS-like environment in a browser. This project was built using
      vanilla Javascript, and later rewritten in Svelte-TS.
    </div>
    <div><img src={logo} alt="ArcOS" class="logo" /></div>
    <div class="text">
      <h1 class="name">ArcOS</h1>
    </div>
  </div>
  <Section header="License">
    The whole ArcOS project is licensed under
    <a href="https://www.gnu.org/licenses/gpl-3.0.txt" target="_blank">
      GPLv3</a
    >.<br /><br />More information about the license and the project as a whole<br
    />
    can be found in the README file of the
    <a href="https://github.com/IzK-ArcOS">ArcOS project page</a>.
  </Section>
  <Section header="For Developers">
    Are you a developer of ArcOS or do you like peeking behind the<br />
    scenes of sites you visit? Developer mode is a tool we use internally<br
    />to monitor different states in ArcOS. You can choose to enable it<br />
    <b>For this user only</b>.
    <button
      class="action martop"
      on:click={enableDevmode}
      disabled={$UserData.devmode}
    >
      <span class="material-icons">bug_report</span>
      Enable developer mode
    </button>
    <button
      class="action martop"
      on:click={disableDevmode}
      disabled={!$UserData.devmode}
    >
      <span class="material-icons">power_settings_new</span>
      Disable developer mode
    </button>
  </Section>
</div>
