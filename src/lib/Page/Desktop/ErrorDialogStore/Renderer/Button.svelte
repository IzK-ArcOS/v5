<script lang="ts">
  import type {
    ErrorButton,
    ErrorMessage,
  } from "../../../../../ts/errorlogic/app";
  import { closeError } from "../../../../../ts/errorlogic/main";

  export let button: ErrorButton;
  export let msg: ErrorMessage;

  function act() {
    button.action();

    close();
  }

  function close() {
    closeError(msg.id);
  }
</script>

<button on:click={act} class:suggested={button.suggested}>
  {button.caption}
</button>
