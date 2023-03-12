<script lang="ts">
  import { maxZIndex } from "../../../ts/applogic/store";

  import type { NotificationData } from "../../../ts/notiflogic/interfaces";
  import {
    closeNotification,
    CurrentNotification,
    deleteNotification,
    NotificationStore,
  } from "../../../ts/notiflogic/main";
  import { UserData } from "../../../ts/userlogic/interfaces";

  let data: NotificationData = null;
  let hide = false;
  let id: string;

  CurrentNotification.subscribe((v) => {
    if (v) {
      hide = true;
      data = null;
      id = v;

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
      deleteNotification(id);
    };
  }
</script>

<div
  class="notification"
  class:hidden={!data || hide}
  class:colored={$UserData.sh.taskbar.colored}
  class:nobutt={data && !data.buttons.length}
  style="z-index: {$maxZIndex + 4}"
>
  {#if data}
    <p class="title">
      {#if data.image}
        <img src={data.image} alt={data.title} />
      {:else}
        <span class="material-icons-round">{data.icon}</span>
      {/if}
      {data.title}
      <button class="close material-icons-round" on:click={close}>
        close
      </button>
    </p>
    <p class="message">{@html data.message}</p>
    <div class="buttons">
      {#each data.buttons as btn}
        <button on:click={buttonEvent(btn.action)}>{btn.capt}</button>
      {/each}
    </div>
  {/if}
</div>
