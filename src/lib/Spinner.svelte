<script lang="ts">
  import "@assets/spinner.css";
  import spinner from "@assets/spinner.svg";
  export let height: number;
</script>

<img
  src={spinner}
  alt="spinner"
  style="height: {height}px;"
  class="spinner-svg"
/>
