<script lang="ts">
  import type { App } from "../../../../../../ts/applogic/interface";
  import { UserName } from "../../../../../../ts/userlogic/interfaces";
  import UserDataExplorer from "../../../../../Page/Desktop/UserDataExplorer.svelte";
  import CloseButton from "../../../../../Page/Desktop/WindowStore/OverlayableWindow/CloseButton.svelte";

  export let app: App;
  export let id: string;
</script>

<CloseButton {app} {id} />
{#if $UserName}
  <div class="overlay-head">
    <h2 class="header">User Data for {$UserName}</h2>
    <p class="subheader">Below is a tree view of your user data:</p>
  </div>
  <UserDataExplorer />
{/if}
