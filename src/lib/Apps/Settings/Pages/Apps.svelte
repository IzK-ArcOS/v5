<script lang="ts">
  import "../../../../css/desktop/apps/settings/apps.css";
  import { importDefault } from "../../../../ts/applogic/imports";
  import { WindowStore } from "../../../../ts/applogic/store";
  import { reloadApps } from "../../../../ts/window/reload";
  import Section from "../Section.svelte";
  import AppButton from "./Apps/AppButton.svelte";
  import HiddenAppButton from "./Apps/HiddenAppButton.svelte";

  let hidden = [];
  let visible = [];

  WindowStore.subscribe((v) => {
    hidden = [];
    visible = [];

    for (let i = 0; i < v.length; i++) {
      if (v[i].info.hidden) hidden.push(v[i]);
      else visible.push(v[i]);
    }
  });
</script>

<h1>Applications</h1>
<div class="apps">
  <p>Here you can manage ArcOS applications.</p>

  <Section collapsible collapsed={false} header="Regular apps">
    {#each visible as app}
      <AppButton {app} />
    {/each}
  </Section>
  <Section collapsible header="Hidden or system apps">
    {#each hidden as app}
      <HiddenAppButton {app} />
    {/each}
  </Section>
  <Section header="Reload apps" collapsible>
    <p class="context">
      Click the button below to reload all applications into the<br
      />WindowStore, in case something didn't load properly.
    </p>
    <button class="reload" on:click={reloadApps}> Reload </button>
  </Section>
</div>
