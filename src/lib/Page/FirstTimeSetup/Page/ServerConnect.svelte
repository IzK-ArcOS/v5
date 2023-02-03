<script lang="ts">
  import { projName } from "../../../../ts/env/main";
  import mode from "../../../../assets/fts/mode.svg";
  import { applyFTSState } from "../../../../ts/fts/main";
  import Nav from "../Nav.svelte";

  function local() {
    applyFTSState("crelocalacc");
  }

  function cloud() {
    applyFTSState("connecttocloud");
  }
</script>

<div class="header centered">
  <img src={mode} alt="Mode" />
  <h1>Select ArcOS Mode</h1>
  <p class="subtitle">
    Do you want to store your users locally or on an ArcAPI?
  </p>
</div>
<button class="fullwidth option centered" on:click={local}
  >Use ArcOS Locally</button
>
<button class="fullwidth option centered" on:click={cloud}
  >Connect to an ArcAPI</button
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
