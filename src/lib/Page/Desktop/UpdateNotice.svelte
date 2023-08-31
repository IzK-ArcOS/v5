<script lang="ts">
  import "../../../css/desktop/apps/UpdateNotice.css";
  import updateIcon from "../../../assets/update.svg";
  import { disableApp } from "../../../ts/applogic/enabling";
  import type { App } from "../../../ts/applogic/interface";

  export let app: App;

  function cancel() {
    disableApp(app.id);
  }
</script>

<div class="updatenotice">
  <img src={updateIcon} alt="Update" />
  <div class="header">
    <h1>Update available!</h1>
    <div class="sub">
      <p class="part">ArcOS 5.0.9</p>
      <div class="dot" />
      <p class="part"><button class="changelog">Changelog</button></p>
    </div>
  </div>
  <p class="context">
    Update now to get the latest features,<br />
    bug fixes and stability improvements.
  </p>

  <div class="bottom">
    <button class="download">Download</button>
    <button class="cancel" on:click={cancel}>Don't show again</button>
  </div>
</div>
