<script lang="ts">
  import "../../../../css/desktop/apps/settings/apps.css";
  import { AppStore } from "../../../../ts/applogic/store";
  import AppButton from "./Apps/AppButton.svelte";
  import HiddenAppButton from "./Apps/HiddenAppButton.svelte";

  let hidden = [];
  let visible = [];

  let showHidden = false;

  AppStore.subscribe((v) => {
    hidden = [];
    visible = [];

    const entries = Object.entries(v);

    for (let i = 0; i < entries.length; i++) {
      if (entries[i][1].info.hidden) hidden.push(entries[i][1]);
      else visible.push(entries[i][1]);
    }
  });
</script>

<h1>Applications</h1>
<div class="apps">
  {#each visible as app}
    <AppButton {app} />
  {/each}
  {#each hidden as app}
    <HiddenAppButton {app} />
  {/each}
</div>
