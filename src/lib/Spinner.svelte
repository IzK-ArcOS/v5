<script lang="ts">
  import spinner from "../assets/spinner.svg";
  export let height: number;
</script>

<img src={spinner} alt="spinner" style="height: {height}px;" />

<style scoped>
  img[alt*="spinner"] {
    vertical-align: middle;
  }
</style>
