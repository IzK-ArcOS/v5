<script lang="ts">
  import logo from "../../../../assets/systemIcon.svg";
  import "../../../../css/desktop/apps/settings/about.css";
  import { DevModeOverride } from "../../../../ts/devmode/props";
  import { ArcOSVersion } from "../../../../ts/env/main";
  import { errorMessage } from "../../../../ts/errorlogic/main";
  import { UserData, UserName } from "../../../../ts/userlogic/interfaces";
  import Section from "../Section.svelte";
  import SystemSection from "./About/SystemSection.svelte";

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
    <div><img src={logo} alt="ArcOS" class="logo" /></div>
    <div class="text">
      <h1 class="name">ArcOS v{ArcOSVersion}</h1>
    </div>
  </div>
  <SystemSection />
  <Section header="License Information" collapsible collapsed>
    The whole ArcOS project is licensed under GPLv3. More information about the
    license and the project as a whole can be found in the README file of the
    <a href="https://github.com/IzK-ArcOS" target="_blank">ArcOS project page</a
    >.
  </Section>
  <Section header="Credits" collapsible collapsed>
    Thanks to the following people:
    <ul>
      <li>Papirus Development Team for their icon set</li>
      <li>SWHFotografie for wallpapers img08 and img13</li>
      <li>Kees van Voorthuizen for wallpaper img14</li>
    </ul>
  </Section>
  <Section header="About" collapsible collapsed>
    ArcOS started of as a weekend project, but these days it is a huge project
    with tons of amazing features. Every version of this project up to this
    point has been lead by me, Izaak Kuipers.<br /><br />Feel free to visit our
    GitHub for more information about the project, and how you can contribute to
    it.
  </Section>
  <!-- <Section header="For Developers">
    Are you a developer of ArcOS or do you like peeking behind the<br />
    scenes of sites you visit? Developer mode is a tool we use internally<br
    />to monitor different states in ArcOS. You can choose to enable it<br />
    <b>For this user only</b>.
    <div class="devmode">
      <button
        class="devmode martop"
        on:click={enableDevmode}
        disabled={$UserData.devmode}
      >
        <span class="material-icons-round">bug_report</span>
        Enable devmode
      </button>
      <button
        class="devmode martop"
        on:click={disableDevmode}
        disabled={!$UserData.devmode}
      >
        <span class="material-icons-round">power_settings_new</span>
        Disable devmode
      </button>
    </div>
  </Section> -->
</div>
