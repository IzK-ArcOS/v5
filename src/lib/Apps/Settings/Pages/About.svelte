<script lang="ts">
  import "../../../../css/desktop/apps/settings/about.css";
  import logo from "../../../../assets/systemIcon.svg";
  import Section from "../Section.svelte";
  import { UserData } from "../../../../ts/userlogic/interfaces";

  function enableDevmode() {
    $UserData.devmode = true;
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
    <button class="action martop" on:click={enableDevmode}>
      <span class="material-icons">bug_report</span>
      Enable developer mode
    </button>
  </Section>
</div>
