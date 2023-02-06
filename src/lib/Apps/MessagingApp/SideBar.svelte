<script lang="ts">
  import { messageSidebarActions } from "../../../ts/messaging/actions/store";
  import { MessagingPages } from "../../../ts/messaging/paging/store";
  import { UserData } from "../../../ts/userlogic/interfaces";
  import { getProfilePicture } from "../../../ts/userlogic/pfp";
  import ProfilePicture from "../../ProfilePicture.svelte";
  import Action from "./SideBar/Action.svelte";
  import Page from "./SideBar/Page.svelte";

  let pfp: string;

  UserData.subscribe(() => {
    pfp = getProfilePicture($UserData.acc.profilePicture);
  });
</script>

<div class="sidebar">
  <div class="pages">
    {#each Object.entries(MessagingPages) as page}
      <Page id={page[0]} data={page[1]} />
    {/each}
  </div>
  <hr />
  <div class="actions">
    {#each messageSidebarActions as action}
      <Action {action} />
    {/each}
  </div>
  <ProfilePicture src={pfp} height={20} />
</div>
