<script lang="ts">
  import "../../../../css/desktop/apps/settings/apps.css";
  import { WindowStore } from "../../../../ts/applogic/store";
  import Section from "../Section.svelte";

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

  <Section collapsible collapsed={false} header="Normal applications">
    {#each visible as app}
      <button class="appbutton">
        <img src={app.info.icon} alt={app.info.name} class="icon" />
        <div class="info">
          <p class="title">{app.info.name}</p>
          <p class="description">{app.info.description}</p>
        </div>
      </button>
    {/each}
  </Section>
  <Section collapsible header="System applications">
    {#each hidden as app}
      <button class="appbutton">
        <img src={app.info.icon} alt={app.info.name} class="icon" />
        <div class="info">
          <p class="title">ArcOS.{app.id}</p>
          <p class="description">{app.info.name} (hidden)</p>
        </div>
      </button>
    {/each}
  </Section>
</div>
