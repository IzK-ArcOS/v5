<script lang="ts">
  import "../../css/fts.css";
  import logo from "../../assets/systemIcon.svg";
  import { projName } from "../../ts/env/main";
  import { onMount } from "svelte";

  let show = false;

  onMount(() => setTimeout(() => (show = true), 500));
</script>

<div class="fts fullscreen" class:show>
  <div class="center-absolute">
    <div class="left">
      <img src={logo} alt={projName} class="center-absolute" />
    </div>
    <div class="right">
      <h1>Right</h1>
    </div>
  </div>
</div>
