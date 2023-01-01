<script lang="ts">
  import { projName } from "../../../../ts/env/main";

  import { applyFTSState } from "../../../../ts/fts/main";
  import Nav from "../Nav.svelte";

  function local() {
    applyFTSState("crelocalacc");
  }

  function cloud() {
    applyFTSState("connecttocloud");
  }
</script>

<div class="header">
  <h1>Select {projName} Mode</h1>
  <p class="subtitle">Time to get you connected.</p>
</div>
<br />
<p>
  You can choose to store userdata locally in your browser, or you can connect
  to an {projName} backend API to sync your user accounts and settings between devices.
</p>
<button class="fullwidth option" on:click={local}>Use {projName} Locally</button
>
<button class="fullwidth option" on:click={cloud}
  >Connect to an {projName} API</button
>
<Nav
  data={{
    back: {
      disabled: false,
      redir: "welcome",
    },
    forw: {
      disabled: true,
      redir: "",
    },
    prog: {
      max: 4,
      val: 2,
    },
  }}
/>
