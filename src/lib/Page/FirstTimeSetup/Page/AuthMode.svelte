<script lang="ts">
  import mode from "../../../../assets/fts/mode.svg";
  import { applyFTSState } from "../../../../ts/fts/main";
</script>

<div class="header centered">
  <img src={mode} alt="Login" />
  <h1>How do you want to log in?</h1>
  <p class="subtitle">Are you a stranger?</p>
</div>
<button
  class="fullwidth option centered"
  on:click={() => applyFTSState("auth-existing")}>As an existing user</button
>
<button
  class="fullwidth option centered"
  on:click={() => applyFTSState("auth-new")}>As a new user</button
>
