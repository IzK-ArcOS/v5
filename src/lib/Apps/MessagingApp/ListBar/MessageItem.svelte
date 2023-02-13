<script lang="ts">
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import { getUserPfp } from "../../../../ts/api/pfp";
  import type { PartialMessage } from "../../../../ts/messaging/interface";
  import { selectedMessageId } from "../../../../ts/messaging/main";
  import { filterPartial } from "../../../../ts/messaging/partial";
  import { messageSubscribe } from "../../../../ts/messaging/updates";
  import { getProfilePicture } from "../../../../ts/userlogic/pfp";
  import ProfilePicture from "../../../ProfilePicture.svelte";

  export let item: PartialMessage;

  let userProfile = "";

  onMount(async () => {
    userProfile = await getUserPfp(item.sender);
  });

  function select() {
    $selectedMessageId = item.id;
  }

  messageSubscribe(async () => {
    userProfile = await getUserPfp(item.sender);
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
      {item.sender}
      {#if item.replyingTo}
        <span class="material-icons-round" title={item.replyingTo}>reply</span>
      {/if}
    </p>
    <p class="partial">{filterPartial(item.partialBody) || "(no content)"}</p>
  </div>
  <div class="timestamp">{dayjs(item.timestamp).format("DD MMM, HH:mm")}</div>
</button>
