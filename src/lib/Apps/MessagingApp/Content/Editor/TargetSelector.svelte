<script lang="ts">
  import defaultProfile from "../../../../../assets/pfp/null.png";
  import { getUserPfp } from "../../../../../ts/api/pfp";
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
    selecting = !selecting;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="target-wrapper">
  <div class="target-selector" on:click={toggle}>
    <div class="current">
      <ProfilePicture src={pfp || defaultProfile} height={32} />
      <div>
        <p class="header">Send to:</p>
        <p>
          {target || "Please select"}
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
