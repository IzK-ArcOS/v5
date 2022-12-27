<script lang="ts">
  import Window from "../WindowStore/Window.svelte";
  import type { ErrorMessage } from "../../../../ts/errorlogic/app";
  import { createErrorAppData } from "../../../../ts/errorlogic/main";
  import Button from "./Renderer/Button.svelte";
  import { onMount } from "svelte";

  export let err: ErrorMessage;

  let exttransition = false;

  onMount(() => {
    console.debug(err);
  });
</script>

{#if err}
  <Window app={createErrorAppData(err)} bind:exttransition>
    <p>
      {@html err.message}
    </p>
    <center>
      <br />
      {#each err.buttons as button, i}
        <Button {button} {i} />
      {/each}
      <br />
    </center>
  </Window>
{/if}
