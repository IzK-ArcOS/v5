<script lang="ts">
  import { applyState } from "../../../../ts/state/main";
  import { projName } from "../../../../ts/env/main";

  import Nav from "../Nav.svelte";

  function restart() {
    applyState("boot");
  }
</script>

<div class="header">
  <h1>Thank you</h1>
  <p class="subtitle">Enjoy using {projName}</p>
</div>
<br />
<p>
  Thank you for checking out ArcOS and I hope you'll enjoy it as much as I enjoy
  making it. Once restarted you will be presented with the login screen. Just
  select your user account and you're good to go!
</p>
<button class="fullwidth option" on:click={restart}>Restart</button>
<Nav
  data={{
    back: {
      disabled: true,
      redir: "",
    },
    forw: {
      disabled: true,
      redir: "",
    },
    prog: {
      max: 4,
      val: 4,
    },
  }}
/>
