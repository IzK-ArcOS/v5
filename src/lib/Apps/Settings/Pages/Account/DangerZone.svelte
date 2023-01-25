<script lang="ts">
  import { errorMessage } from "../../../../../ts/errorlogic/main";
  import Notice from "../../../../Page/Desktop/WindowStore/Window/Notice.svelte";
  import Section from "../../Section.svelte";
  import warning from "../../../../../assets/apps/error.svg";
  import { UserName } from "../../../../../ts/userlogic/interfaces";
  import { deleteUser } from "../../../../../ts/userlogic/main";

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
</script>

<Section header="Danger Zone">
  <p class="context">
    Want to delete this account? Here you can do just that. Beware<br />
    that you will delete any data inside your account forever.
  </p>
  <button on:click={deleteAccount}> Delete account... </button>
</Section>
