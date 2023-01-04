<script lang="ts">
  import "../../../../css/fts/page/welcome.css";
  import { projName } from "../../../../ts/env/main";
  import Nav from "../Nav.svelte";
  import logo from "../../../../assets/systemIcon.svg";
  import { applyFTSState } from "../../../../ts/fts/main";
</script>

<div class="center-flex">
  <div>
    <img src={logo} alt="ArcOS" class="logo" />
    <h1 class="center-header">Welcome</h1>
    <p class="center">Let's get ArcOS installed.</p>
    <button on:click={() => applyFTSState("servconn")}>Let's begin</button>
  </div>
</div>
