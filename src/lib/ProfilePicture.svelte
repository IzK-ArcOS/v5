<script lang="ts">
  export let src: string;
  export let height: number;
  export let className: string = "";
</script>

<div
  class="pfprenderer {className} pfp"
  style="background-image:url('{src}'); height:{height}px;"
/>

<style scoped>
  div.pfprenderer {
    aspect-ratio: 1/1;
    background-size: cover;
    overflow: hidden;
    border-radius: 50%;
    background-position: center;
    display: inline-block;
  }
</style>
