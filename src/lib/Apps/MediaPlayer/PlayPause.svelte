<script lang="ts">
  export let audioObject: HTMLAudioElement;
  export let barWidth: number;
  export let paused: boolean;
</script>

<div class="group">
  <button
    class="material-icons-round"
    on:click={() => audioObject.play()}
    disabled={!paused && barWidth < 100}>play_arrow</button
  >
  <button
    class="material-icons-round"
    on:click={() => audioObject.pause()}
    disabled={paused}>pause</button
  >
</div>
