<script lang="ts">
  import "../css/mbb.css";
  import systemIcon from "../assets/systemIcon.svg";
  import { onMount } from "svelte";

  let hide = false;

  function removeBlock() {
    localStorage.setItem("bypassMobileBlock", "true");

    hide = true;
  }

  onMount(() => {
    hide = localStorage.getItem("bypassMobileBlock") === "true";
  });
</script>

{#if !hide}
  <div class="mbb fullscreen">
    <div class="center-absolute">
      <img src={systemIcon} alt="ArcOS" />
      <h2>Hold up...</h2>
      <br />
      <p>
        ArcOS is designed for desktop sized displays.<br />Blocking you from
        using ArcOS seemed a bit mean, so you can proceed, but just know that
        not all UI components will fit on your display.
      </p>
      <button on:click={removeBlock}>Okay, let me in!</button>
    </div>
  </div>
{/if}
