<script lang="ts">
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import { getUserPfp } from "../../../../ts/api/pfp";
  import type { PartialMessage } from "../../../../ts/messaging/interface";
  import { selectedMessageId } from "../../../../ts/messaging/main";
  import { messagingPage } from "../../../../ts/messaging/paging/store";
  import { filterPartial } from "../../../../ts/messaging/partial";
  import { messageSubscribe } from "../../../../ts/messaging/updates";
  import ProfilePicture from "../../../ProfilePicture.svelte";

  export let item: PartialMessage;

  let invert = false;
  let userProfile = "";

  onMount(update);
  messageSubscribe(update);

  function select() {
    $selectedMessageId = item.id;
  }

  async function update() {
    userProfile = await getUserPfp(invert ? item.receiver : item.sender);
  }

  messagingPage.subscribe((v) => {
    invert = v.name == "Sent";
  });
</script>

<button
  class="message"
  on:click={select}
  class:selected={$selectedMessageId == item.id}
>
  <ProfilePicture src={userProfile} height={26} />
  <div class="content">
    <p class="username">
      {invert ? item.receiver : item.sender}
      {#if item.replyingTo}
        <span class="material-icons-round" title={item.replyingTo}>reply</span>
      {/if}
    </p>
    <p class="partial">{filterPartial(item.partialBody) || "(no content)"}</p>
  </div>
  <div class="timestamp">{dayjs(item.timestamp).format("DD-MM HH:mm")}</div>
</button>
