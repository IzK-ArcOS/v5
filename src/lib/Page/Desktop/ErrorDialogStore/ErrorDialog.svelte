<script lang="ts">
  import type { App } from "../../../../ts/applogic/interface";
  import type { ErrorMessage } from "../../../../ts/errorlogic/app";
  import Button from "./Renderer/Button.svelte";

  export let msg: ErrorMessage;
</script>

<div class="error-dialog">
  {#if msg.image}
    <div class="errimg"><img src={msg.image} alt={msg.title} /></div>
  {/if}
  <div class="error-content">
    <h3 class="error-title">{msg.title}</h3>
    <p class="error-message">
      {@html msg.message || "$error.message"}
    </p>
  </div>
</div>
<div class="error-buttons">
  <div class="inner">
    {#each msg.buttons as button}
      <Button {button} {msg} />
    {/each}
  </div>
</div>
