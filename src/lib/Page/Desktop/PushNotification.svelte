<script lang="ts">
  import { maxZIndex } from "../../../ts/applogic/store";

  import type { NotificationData } from "../../../ts/notiflogic/interfaces";
  import {
    closeNotification,
    CurrentNotification,
    NotificationStore,
  } from "../../../ts/notiflogic/main";

  let data: NotificationData = null;
  let hide = false;

  CurrentNotification.subscribe((v) => {
    if (v) {
      hide = true;
      data = null;

      setTimeout(() => {
        hide = false;
        data = $NotificationStore[v];
      }, 250);

      return;
    }

    hide = true;

    setTimeout(() => {
      data = null;
    }, 300);
  });

  function close() {
    closeNotification();
  }

  function buttonEvent(e: () => void) {
    return () => {
      e();

      close();
    };
  }
</script>

<div
  class="notification"
  class:hidden={!data || hide}
  style="z-index: {$maxZIndex + 4}"
>
  {#if data}
    <p class="title">
      <span class="material-icons">{data.icon}</span>{data.title}
      <button class="close material-icons" on:click={close}> close </button>
    </p>
    <p class="message">{data.message}</p>
    <div class="buttons">
      {#each data.buttons as btn}
        <button on:click={buttonEvent(btn.action)}>{btn.capt}</button>
      {/each}
    </div>
  {/if}
</div>
