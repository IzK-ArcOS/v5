<script lang="ts">
  import defaultProfile from "../../../../../assets/pfp/null.png";
  import { getUserPfp } from "../../../../../ts/api/pfp";
  import { replyMessageId } from "../../../../../ts/messaging/main";
  import type { UserData } from "../../../../../ts/userlogic/interfaces";
  import ProfilePicture from "../../../../ProfilePicture.svelte";
  import User from "./TargetSelector/User.svelte";

  export let users: [string, UserData][];
  export let target: string;

  let pfp = "";
  let selecting = false;

  async function update() {
    pfp = await getUserPfp(target);
  }

  function toggle() {
    if ($replyMessageId) return (selecting = false);

    selecting = !selecting;
  }

  replyMessageId.subscribe(() => setTimeout(update, 500));
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="target-wrapper">
  <div class="target-selector" on:click={toggle}>
    <div class="current">
      <ProfilePicture src={pfp || defaultProfile} height={32} />
      <div>
        <p class="header">{$replyMessageId ? "Reply" : "Send"} to:</p>
        <p>
          {$replyMessageId
            ? `#${$replyMessageId} (${target})`
            : target || "Please select"}
        </p>
      </div>
    </div>
  </div>
  <div class="target-options" class:visible={selecting}>
    {#each users as entry}
      <User bind:target bind:selecting {entry} bind:pfp />
    {/each}
  </div>
</div>
