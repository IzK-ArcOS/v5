<script lang="ts">
  import { applyCustomPfp } from "$$ts/userlogic/pfp";
  import { hideOverlay } from "$$ts/window/overlay";
  import "@css/desktop/apps/settings/account/customPfp.css";
  import def from "@assets/pfp/null.png";
  import ProfilePicture from "../../../../../ProfilePicture.svelte";
  import { UserData } from "$$ts/userlogic/interfaces";
  let img = "";
  let valid = false;

  async function check() {
    const v = await checkImage(img);

    valid = v;
  }

  function apply() {
    applyCustomPfp(img);

    hideOverlay("customPfp", "SettingsApp");
    hideOverlay("pfpSel", "SettingsApp");
  }

  function cancel() {
    hideOverlay("customPfp", "SettingsApp");
  }

  async function checkImage(url): Promise<boolean> {
    const img = new Image();

    img.src = url;

    return new Promise((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  }

  UserData.subscribe((v) => {
    if (typeof v.acc.profilePicture == "string") img = v.acc.profilePicture;

    check();
  });
</script>

<div class="custompfp-wrapper">
  <div><ProfilePicture src={valid ? img : def} height={50} /></div>
  <div class="field">
    <p>Enter the URL to a custom profile picture:</p>
    <input
      type="url"
      placeholder="https://example.com/image.png"
      bind:value={img}
      on:input={check}
    />
    <div class="apply">
      <div>
        <button on:click={cancel}>Cancel</button>
        <button on:click={apply} disabled={!img || !valid}>Apply</button>
      </div>
    </div>
  </div>
</div>
