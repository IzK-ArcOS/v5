<script lang="ts">
  import { onMount } from "svelte";
  import { getUserPfp } from "../../../../ts/api/pfp";
  import type { PartialMessage } from "../../../../ts/messaging/interface";
  import { selectedMessageId } from "../../../../ts/messaging/main";
  import { filterPartial } from "../../../../ts/messaging/partial";
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
</script>

<button
  class="message"
  on:click={select}
  class:selected={$selectedMessageId == item.id}
>
  <ProfilePicture src={userProfile} height={26} />
  <div class="content">
    <p class="username">{item.sender}</p>
    <p class="partial">{filterPartial(item.partialBody) || "(no content)"}</p>
  </div>
</button>
