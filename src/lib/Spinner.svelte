<script lang="ts">
  import "../css/spinner.css";
  import { SpinnerIcon } from "../ts/icon/main";
  export let height: number;
</script>

<img
  src={SpinnerIcon}
  alt="spinner"
  style="height: {height}px;"
  class="spinner-svg"
/>
