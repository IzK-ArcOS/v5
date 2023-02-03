<script lang="ts">
  import "@css/desktop/apps/settings/account/udataExplorer.css";
  import type { App } from "$$ts/applogic/interface";
  import { UserData, UserName } from "$$ts/userlogic/interfaces";
  import CloseButton from "../../../../../Page/Desktop/WindowStore/OverlayableWindow/CloseButton.svelte";
  import Branch from "./UserDataExplorer/Branch.svelte";
  import Node from "./UserDataExplorer/Node.svelte";

  export let app: App;
  export let id: string;
</script>

<CloseButton {app} {id} />
{#if $UserData}
  <div class="overlay-head">
    <h2 class="header">User Data for {$UserName}</h2>
    <p class="subheader">Below is a tree view of your user data:</p>
  </div>
  {#each Object.entries($UserData) as node}
    <div class="toplevel-item">
      {#if typeof node[1] == "object"}
        <Branch key={node[0]} value={node[1]} top />
      {:else}
        <Node key={node[0]} value={node[1]} />
      {/if}
    </div>
  {/each}
{/if}
