<script lang="ts">
  import save from "../../../assets/apps/textview/save.svg";
  import type { App, Process } from "../../../ts/applogic/interface";

  import Spinner from "../../Spinner.svelte";
  export let saving: boolean;
  export let parent: Process;
</script>

{#if saving && parent.openedFile}
  <div class="saving-wrapper">
    <div class="saving-content">
      <img src={save} alt="Saving" />
      <p class="caption">Saving {parent.openedFile.name}...</p>
      <Spinner height={24} />
    </div>
  </div>
{/if}
