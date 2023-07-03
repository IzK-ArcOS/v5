<script lang="ts">
  import usericon from "../../../../../../assets/apps/settings/account.svg";
  import "../../../../../../css/desktop/apps/settings/account/changeUname.css";
  import { changeUsername } from "../../../../../../ts/api/cred";
  import type { Process } from "../../../../../../ts/applogic/interface";
  import { createOverlayableError } from "../../../../../../ts/errorlogic/overlay";
  import {
    UserData,
    UserName,
  } from "../../../../../../ts/userlogic/interfaces";
  import { getProfilePicture } from "../../../../../../ts/userlogic/pfp";
  import { hideOverlay } from "../../../../../../ts/window/overlay";
  import ProfilePicture from "../../../../../ProfilePicture.svelte";

  let img = "";

  export let id: string;
  export let parent: Process;

  let newName = "";

  UserData.subscribe((v) => {
    img = getProfilePicture(v.acc.profilePicture);
  });

  async function change() {
    const valid = await changeUsername($UserName, newName);

    if (!valid)
      return createOverlayableError(
        {
          title: "Can't rename user",
          message:
            "An error occured while trying to rename your account. Please make sure the information is correct, and then try again.",
          buttons: [{ caption: "OK", action: reset }],
          image: usericon,
        },
        parent.id
      );

    createOverlayableError(
      {
        title: "Username changed.",
        message: "Your username has been updated successfully.",
        buttons: [{ caption: "OK", action: closeThis }],
        image: usericon,
      },
      parent.id
    );
  }

  function cancel() {
    hideOverlay(id, parent.id);
  }

  function reset() {
    newName = "";
  }

  function closeThis() {
    reset();
    cancel();
  }
</script>

<div class="changename-wrapper">
  <div><ProfilePicture src={img} height={50} /></div>
  <div class="field">
    <p class="username">{$UserName}</p>
    <p>Enter a new username</p>
    <input
      type="text"
      name="current"
      placeholder="New username"
      bind:value={newName}
    />
    <div class="apply">
      <div>
        <button on:click={cancel}>Cancel</button>
        <button on:click={change} disabled={!newName}> Change </button>
      </div>
    </div>
  </div>
</div>
