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
