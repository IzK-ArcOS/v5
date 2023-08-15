<script lang="ts">
  export let audioObject: HTMLAudioElement;

  function rewind() {
    audioObject.currentTime -= 10;
  }

  function forward() {
    audioObject.currentTime += 10;
  }
</script>

<div class="group">
  <button class="material-icons-round" on:click={rewind}>fast_rewind</button>
  <button class="material-icons-round" on:click={forward}>fast_forward</button>
</div>
