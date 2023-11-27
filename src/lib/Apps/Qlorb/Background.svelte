<script lang="ts">
  import { onMount } from "svelte";
  import { tsParticles } from "tsparticles-engine";
  import { loadFirePreset } from "tsparticles-preset-fire";

  onMount(async () => {
    await loadFirePreset(tsParticles);
    await tsParticles.load("__qlorb-bg", {
      preset: "fire",
      background: {
        opacity: 0,
      },
      backgroundMode: false,
      particles: {
        number: {
          limit: 500,
        },
        color: {
          value: "#888",
        },
        opacity: {
          value: 0.15,
        },
      },
    });
  });
</script>

<div class="bg fullscreen" id="__qlorb-bg"></div>
