<script lang="ts">
  import {
    currentSettingsPage,
    setSettingsPage,
    SettingsPages,
  } from "../../../ts/applogic/apps/SettingsApp/main";
  import { UserData, UserName } from "../../../ts/userlogic/interfaces";
  import { getProfilePicture } from "../../../ts/userlogic/pfp";

  let pfp = "";

  UserData.subscribe(() => {
    pfp = getProfilePicture(parseInt($UserData.acc.profilePicture as string));
  });
</script>

<div class="sidebar">
  <div class="pages">
    {#each SettingsPages as page}
      <button
        class="page"
        class:selected={$currentSettingsPage &&
          page.name == $currentSettingsPage.name}
        on:click={() => setSettingsPage(page)}
        disabled={page.disabled}
      >
        <img src={page.icon} alt={page.name} class="icon" />
        <span class="caption">{page.name}</span>
      </button>
      {#if page.sep}<hr />{/if}
    {/each}
  </div>
  <div class="userprofile">
    <img src={pfp} alt={$UserName} class="pfp" />
    <div class="username">
      <p class="name">{$UserName}</p>
      <p class="hostname">
        {localStorage.getItem("arcos-server") || location.hostname}
      </p>
    </div>
  </div>
</div>
