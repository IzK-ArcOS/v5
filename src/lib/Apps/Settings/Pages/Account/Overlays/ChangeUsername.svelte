<script lang="ts">
  import { changeUsername } from "../../../../../../ts/api/cred";
  import { resetAppIcon } from "../../../../../../ts/applogic/icon";
  import type { App } from "../../../../../../ts/applogic/interface";
  import { createOverlayableError } from "../../../../../../ts/errorlogic/overlay";
  import {
    UserData,
    UserName,
  } from "../../../../../../ts/userlogic/interfaces";
  import { getProfilePicture } from "../../../../../../ts/userlogic/pfp";
  import { hideOverlay } from "../../../../../../ts/window/overlay";
  import ProfilePicture from "../../../../../ProfilePicture.svelte";
  import usericon from "../../../../../../assets/apps/settings/account.svg";
  import "../../../../../../css/desktop/apps/settings/account/changeUname.css";

  let img = "";

  export let id: string;
  export let app: App;

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
        "SettingsApp"
      );

    createOverlayableError(
      {
        title: "Username changed.",
        message: "Your username has been updated successfully.",
        buttons: [{ caption: "OK", action: closeThis }],
        image: usericon,
      },
      "SettingsApp"
    );
  }

  function cancel() {
    hideOverlay(id, app.id);
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
        <button on:click={change} disabled={!newName} type="button">
          Change
        </button>
      </div>
    </div>
  </div>
</div>
