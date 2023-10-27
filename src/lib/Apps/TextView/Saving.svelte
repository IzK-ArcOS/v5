<script lang="ts">
  import type { App } from "../../../ts/applogic/interface";
  import { SaveIcon } from "../../../ts/icon/general";

  import Spinner from "../../Spinner.svelte";
  export let saving: boolean;
  export let app: App;
</script>

{#if saving && app.openedFile}
  <div class="saving-wrapper">
    <div class="saving-content">
      <img src={SaveIcon} alt="Saving" />
      <p class="caption">Saving {app.openedFile.name}...</p>
      <Spinner height={24} />
    </div>
  </div>
{/if}
