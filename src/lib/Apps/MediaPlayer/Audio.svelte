<script lang="ts">
  export let url: string;
  export let audioObject: HTMLAudioElement;
  export let duration: number;
  export let current: number;
  export let updateWidth: () => any;
</script>

<audio
  src={url}
  controls
  bind:this={audioObject}
  bind:duration
  bind:currentTime={current}
  on:timeupdate={updateWidth}
  autoplay
/>
