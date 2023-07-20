<script lang="ts">
  import "../../../../css/desktop/apps/settings/about.css";
  import { Logo } from "../../../../ts/branding";
  import { ArcOSVersion } from "../../../../ts/env/main";
  import Section from "../Section.svelte";
  import SystemSection from "./About/SystemSection.svelte";
</script>

<div class="about-page">
  <div class="product">
    <div><img src={Logo()} alt="ArcOS" class="logo" /></div>
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
    Thanks to all the people who helped expand ArcOS to what it is today.
    Curious who make ArcOS possible? Go ahead and visit our Frontend GitHub
    page, we list our contributors there.
  </Section>
  <Section header="About" collapsible collapsed>
    ArcOS started of as a weekend project, but these days it is a huge project
    with tons of amazing features. Every version of this project up to this
    point has been lead by me, Izaak Kuipers.<br /><br />Feel free to visit our
    GitHub for more information about the project, and how you can contribute to
    it.
  </Section>
</div>
