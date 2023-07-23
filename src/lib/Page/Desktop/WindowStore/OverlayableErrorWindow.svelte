<script lang="ts">
  import { onMount } from "svelte";
  import "../../../../css/desktop/window/overlay/error.css";
  import type {
    App,
    OverlayableError,
  } from "../../../../ts/applogic/interface";
  import { destroyOverlayableError } from "../../../../ts/errorlogic/overlay";

  export let app: App;
  export let error: OverlayableError;

  let show = false;

  function closeThis() {
    show = false;

    setTimeout(() => {
      destroyOverlayableError(error.id, app.id);
    }, 100);
  }

  onMount(() => {
    setTimeout(() => {
      show = true;
    }, 100);
  });

  function e(cb: () => void) {
    cb();

    closeThis();
  }
</script>

<div class="overlay-wrapper" class:show>
  <window
    class="window headless overlay overlayable-error"
    class:visible={show}
  >
    <div class="body overlay">
      <div class="error-overlay">
        {#if error.image}
          <div class="errimg"><img src={error.image} alt={error.title} /></div>
        {/if}
        <div class="error-content">
          <h3 class="error-title">{error.title}</h3>
          <p class="error-message">
            {#if error.component}
              <div class="component">
                <svelte:component this={error.component} {error} />
              </div>
            {:else}
              {@html error.message || "$error.message"}
            {/if}
          </p>
        </div>
      </div>
      <div class="error-overlay-buttons">
        <div class="inner">
          {#each error.buttons as button}
            <button on:click={() => e(button.action)}>{button.caption}</button>
          {/each}
        </div>
      </div>
    </div>
  </window>
</div>
