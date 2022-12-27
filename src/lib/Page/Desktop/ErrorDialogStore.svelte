<script lang="ts">
  import { ErrorMessages, ErrorWindowStore } from "../../../ts/errorlogic/app";
  import Window from "./WindowStore/Window.svelte";
  import Button from "./ErrorDialogStore/Renderer/Button.svelte";
</script>

<div class="winstore">
  {#each $ErrorWindowStore as app}
    <Window {app}>
      {#each $ErrorMessages as msg}
        {#if `error_${msg.id}` == app.id}
          <p>
            {@html msg.message}
          </p>
          <center>
            <br />
            {#each msg.buttons as button}
              <Button {button} {msg} />
            {/each}
            <br />
          </center>
        {/if}
      {/each}
    </Window>
  {/each}
</div>
