<script lang="ts">
  import { ErrorMessages, ErrorWindowStore } from "../../../ts/errorlogic/app";
  import { ArcSoundBus } from "../../../ts/sound/main";
  import ErrorDialog from "./ErrorDialogStore/ErrorDialog.svelte";
  import Button from "./ErrorDialogStore/Renderer/Button.svelte";
  import Window from "./WindowStore/Window.svelte";
</script>

<div class="winstore">
  {#each $ErrorWindowStore as app}
    <Window {app}>
      {#each $ErrorMessages as msg}
        {#if `error_${msg.id}` == app.id}
          <ErrorDialog {msg} />
        {/if}
      {/each}
    </Window>
  {/each}
</div>
