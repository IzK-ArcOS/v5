<script lang="ts">
  import "../../../../css/desktop/apps/settings/about.css";
  import type { Process } from "../../../../ts/applogic/interface";
  import { Logo } from "../../../../ts/branding";
  import { ArcOSVersion } from "../../../../ts/env/main";
  import Section from "../Section.svelte";
  import SystemSection from "./About/SystemSection.svelte";

  export let process: Process;
</script>

<div class="about-page">
  <div class="product">
    <div><img src={Logo()} alt="ArcOS" class="logo" /></div>
    <div class="text">
      <h1 class="name">ArcOS v{ArcOSVersion}</h1>
    </div>
  </div>
  <SystemSection {process} />
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
</div>
