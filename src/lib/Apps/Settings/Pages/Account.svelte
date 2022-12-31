<script lang="ts">
  import "../../../../css/desktop/apps/settings/account.css";
  import { openWindow } from "../../../../ts/applogic/events";
  import { UserData, UserName } from "../../../../ts/userlogic/interfaces";
  import { getProfilePicture } from "../../../../ts/userlogic/pfp";
  import Notice from "../../../Page/Desktop/WindowStore/Window/Notice.svelte";
  import Section from "../Section.svelte";

  let pfp = "";

  UserData.subscribe((v) => {
    pfp = getProfilePicture(parseInt(v.acc.profilePicture as string));
  });
</script>

<div class="settingspage-account">
  <div class="info">
    <div>
      <img src={pfp} alt={$UserName} />
    </div>
    <div>
      <p class="username">{$UserName}</p>
      <p class="host">{location.hostname}</p>
    </div>
  </div>
  <Section header="Profile picture">
    <p class="context">
      Click the button below to change your profile picture to one of the<br
      />30 built-in pictures, or enter a url to a custom image.
    </p>
    <button on:click={() => openWindow("PfpSelector")}>
      Select from built-in
    </button>
    <button disabled> Choose custom </button>
  </Section>
  <Notice
    title="Can't choose custom"
    text="It's currently not possible to choose a custom profile<br/>picture for your user account. This functionality is still<br/>being implemented."
    icon="block"
  />
</div>
