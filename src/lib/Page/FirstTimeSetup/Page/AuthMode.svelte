<script lang="ts">
  import { applyFTSState } from "../../../../ts/fts/main";
  import { ModeIcon } from "../../../../ts/icon/main";
</script>

<div class="header centered">
  <img src={ModeIcon} alt="Login" />
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
