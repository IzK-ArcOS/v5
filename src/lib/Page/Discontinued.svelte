<script lang="ts">
  import "../../css/discontinued.css";
  import { UserToken } from "../../ts/userlogic/interfaces";

  function restart() {
    location.reload();
  }
</script>

<div class="fullscreen center-flex discontinued">
  <span class="material-icons-round blocked"> block </span>
  <h1>Session discontinued</h1>
  <p>
    Your user token has been discontinued. This session is no longer valid. To
    keep using ArcOS, click <b>Restart</b>.
  </p>
  <p class="token">
    <span class="title">User Token</span>
    <span class="value">{$UserToken}</span>
  </p>
  <button class="restart" on:click={restart}>Restart</button>
</div>
