<script lang="ts">
  import warning from "../../../../assets/apps/error.svg";
  import "../../../../css/desktop/apps/settings/account.css";
  import { openWindow } from "../../../../ts/applogic/events";
  import { DevModeOverride } from "../../../../ts/devmode/props";
  import { errorMessage } from "../../../../ts/errorlogic/main";
  import { UserData, UserName } from "../../../../ts/userlogic/interfaces";
  import { deleteUser } from "../../../../ts/userlogic/main";
  import { getProfilePicture } from "../../../../ts/userlogic/pfp";
  import Notice from "../../../Page/Desktop/WindowStore/Window/Notice.svelte";
  import Section from "../Section.svelte";

  let pfp = "";

  UserData.subscribe((v) => {
    pfp = getProfilePicture(parseInt(v.acc.profilePicture as string));
  });

  function deleteAccount() {
    errorMessage(
      "Delete ArcOS Account",
      "Are you sure you want to delete your ArcOS account? This will delete any and all user data associated with this account. These changes cannot be reverted.",
      warning,
      {
        caption: "Proceed",
        action: () => deleteUser($UserName),
      },
      {
        caption: "Back to safety",
        action: () => {},
      }
    );
  }
</script>

<div class="settingspage-account">
  <div class="info">
    <div>
      <img src={pfp} alt={$UserName} />
    </div>
    <div>
      <p class="username">
        {$UserName}
      </p>
      <p class="host">
        {localStorage.getItem("arcos-server") || location.hostname}
        {#if $DevModeOverride}
          (developer)
        {/if}
      </p>
    </div>
  </div>
  <Section header="Profile picture" collapsible collapsed={false}>
    <p class="context">
      Choose a custom profile picture to further<br />
      personalize your ArcOS account.
    </p>
    <button on:click={() => openWindow("PfpSelector")} class="action">
      <span class="material-icons">exit_to_app</span>
      Select from built-in
    </button>
    <button class="action" disabled>
      <span class="material-icons">upload</span>
      Choose custom
    </button>
  </Section>
  <Section header="Danger Zone" collapsible>
    <Notice
      icon="warning"
      title="Watch your steps!"
      text="This section contains settings that cannot be undone.<br/>Continue at your own risk."
    />
    <button class="action" on:click={deleteAccount}>
      <span class="material-icons">delete</span>
      Delete account
    </button>
    <button class="action" disabled>
      <span class="material-icons">restart_alt</span>
      Reset account
    </button>
  </Section>
</div>
