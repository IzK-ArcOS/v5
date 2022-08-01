<script lang="ts">
  import Window from "../WindowStore/Window.svelte";
  import type { ErrorMessage } from "../../../../ts/errorlogic/app";
  import { createErrorAppData } from "../../../../ts/errorlogic/main";
  import Button from "./Renderer/Button.svelte";

  export let err: ErrorMessage;

  let opened = false;
  let exttransition = false;
</script>

{#if err}
  <Window app={createErrorAppData(err)} bind:exttransition bind:opened>
    <p>
      {@html err.message}
    </p>
    <center>
      <br />
      {#each err.buttons as button, i}
        <Button {button} {i} bind:opened />
      {/each}
      <br/>
    </center>
    
  </Window>
{/if}
