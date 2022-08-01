<script lang="ts">
  import { get } from "svelte/store";

  import {
    ErrorButton,
    ErrorMessage,
    ErrorMessages,
  } from "../../../../../ts/errorlogic/app";

  export let button: ErrorButton;
  export let i: number;
  export let opened: boolean = false;

  function act() {
    button.action();

    close();
  }

  function close() {
    opened = false;

    setTimeout(() => {
      const errors = get(ErrorMessages);

      errors[i] = null;

      ErrorMessages.set(errors);
    }, 250);
  }
</script>

<button on:click={act}>
  {button.caption}
</button>
