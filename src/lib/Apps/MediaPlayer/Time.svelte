<script lang="ts">
  export let current: number;
  export let duration: number;
  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
</script>

<div class="right">{formatTime(current)} / {formatTime(duration)}</div>
