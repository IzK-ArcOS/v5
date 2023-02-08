<script lang="ts">
  import "../css/spinner.css";
  import spinner from "../assets/spinner.svg";
  export let height: number;
</script>

<img
  src={spinner}
  alt="spinner"
  style="height: {height}px;"
  class="spinner-svg"
/>
