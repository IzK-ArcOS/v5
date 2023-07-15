<script>
  import { onMount } from "svelte";
  import cursor from "../assets/cursors/cursor.png";

  export let size = 32;

  let x = -100;
  let y = -100;

  onMount(() => {
    document.addEventListener("mousemove", (e) => {
      x = e.clientX;
      y = e.clientY;
    });
  });
</script>

<div class="custom-cursor">
  <img
    src={cursor}
    alt="Cursor"
    class="custom-cursor"
    style="left: {x}px; top: {y}px; --size: {size}px;"
  />
</div>

<style>
  .custom-cursor {
    --size: 200px;
    width: var(--size);
    height: var(--size);
    position: fixed;
    pointer-events: none;
    transition: none !important;
    z-index: 10000000000000000000000000000000;
  }
</style>
