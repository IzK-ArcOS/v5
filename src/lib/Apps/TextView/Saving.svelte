<script lang="ts">
  import save from "../../../assets/apps/textview/save.svg";
  import type { App } from "../../../ts/applogic/interface";

  import Spinner from "../../Spinner.svelte";
  export let saving: boolean;
  export let app: App;
</script>

{#if saving && app.openedFile}
  <div class="saving-wrapper">
    <div class="saving-content">
      <img src={save} alt="Saving" />
      <p class="caption">Saving {app.openedFile.name}...</p>
      <Spinner height={24} />
    </div>
  </div>
{/if}
