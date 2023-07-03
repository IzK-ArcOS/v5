<script lang="ts">
  import warning from "../../../../../assets/apps/error.svg";
  import type { Process } from "../../../../../ts/applogic/interface";
  import { createOverlayableError } from "../../../../../ts/errorlogic/overlay";
  import { deleteUser } from "../../../../../ts/userlogic/main";
  import { showOverlay } from "../../../../../ts/window/overlay";
  import OptionSection from "../../OptionSection.svelte";

  export let process: Process;

  function deleteAccount() {
    createOverlayableError(
      {
        title: "Delete ArcOS Account",
        message:
          "Are you sure you want to delete your ArcOS account? This will delete any and all user data associated with this account. These changes cannot be reverted.",
        image: warning,
        buttons: [
          { action: () => deleteUser(), caption: "Proceed" },
          { action: () => {}, caption: "Back to safety" },
        ],
      },
      process.id
    );
  }

  function changeName() {
    showOverlay("changeUsername", process.id);
  }

  function changePswd() {
    showOverlay("changePswd", process.id);
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
