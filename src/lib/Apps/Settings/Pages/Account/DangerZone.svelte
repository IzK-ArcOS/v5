<script lang="ts">
  import { createOverlayableError } from "../../../../../ts/errorlogic/overlay";
  import { ErrorIcon } from "../../../../../ts/icon/apps";
  import { deleteUser } from "../../../../../ts/userlogic/main";
  import { showOverlay } from "../../../../../ts/window/overlay";
  import OptionSection from "../../OptionSection.svelte";

  function deleteAccount() {
    createOverlayableError(
      {
        title: "Delete ArcOS Account",
        message:
          "Are you sure you want to delete your ArcOS account? This will delete any and all user data associated with this account. These changes cannot be reverted.",
        image: ErrorIcon,
        buttons: [
          { action: () => deleteUser(), caption: "Proceed" },
          { action: () => {}, caption: "Back to safety" },
        ],
      },
      "SettingsApp"
    );
  }

  function changeName() {
    showOverlay("changeUsername", "SettingsApp");
  }

  function changePswd() {
    showOverlay("changePswd", "SettingsApp");
  }
</script>

<OptionSection
  title="Change username"
  context="Migrate your userdata to another username."
>
  <button on:click={changeName}> Change... </button>
</OptionSection>
<OptionSection
  title="Change password"
  context="Change the password you use to log in."
>
  <button on:click={changePswd}> Change... </button>
</OptionSection>
<OptionSection title="Delete account" context="Delete your ArcOS account">
  <button on:click={deleteAccount}> Delete account... </button>
</OptionSection>
