<script lang="ts">
  import { errorMessage } from "../../../../../ts/errorlogic/main";
  import Notice from "../../../../Page/Desktop/WindowStore/Window/Notice.svelte";
  import Section from "../../Section.svelte";
  import warning from "../../../../../assets/apps/error.svg";
  import { UserName } from "../../../../../ts/userlogic/interfaces";
  import { deleteUser } from "../../../../../ts/userlogic/main";
  import OptionSection from "../../OptionSection.svelte";
  import { ConnectedServer } from "../../../../../ts/api/main";
  import { showOverlay } from "../../../../../ts/window/overlay";

  function deleteAccount() {
    errorMessage(
      "Delete ArcOS Account",
      "Are you sure you want to delete your ArcOS account? This will delete any and all user data associated with this account. These changes cannot be reverted.",
      warning,
      "SettingsApp",
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

  function changePswd() {
    showOverlay("changePswd", "SettingsApp");
  }
</script>

<OptionSection title="Delete account" context="Delete your ArcOS account">
  <button on:click={deleteAccount}> Delete account... </button>
</OptionSection>
<OptionSection
  title="Change username"
  context="Migrate your userdata to another username."
>
  <button disabled> Change... </button>
</OptionSection>
{#if $ConnectedServer}
  <OptionSection
    title="Change password"
    context="Change the password you use to log in."
  >
    <button on:click={changePswd}> Change... </button>
  </OptionSection>
{/if}
