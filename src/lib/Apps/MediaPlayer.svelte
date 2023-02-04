<script lang="ts">
  import "../../assets/apps/mediaplayer.css";
  import { getMimeIcon } from "../../ts/api/fs/icon";
  import type { App } from "../../ts/applogic/interface";
  import { WindowStore } from "../../ts/applogic/store";

  let audioObject: HTMLAudioElement;

  export let app: App;
  let barWidth = 0;

  let duration = 0;
  let current = 0;
  let url = "";
  let filename = "";
  let paused = true;

  WindowStore.subscribe(() => {
    if (!app.openedFile || !audioObject || filename == app.openedFile.name)
      return;

    filename = app.openedFile.name;

    url = URL.createObjectURL(
      new Blob([app.openedFile.data], { type: app.openedFile.mime })
    );

    setTimeout(() => {
      audioObject.play();
    });
  });

  function rewind() {
    audioObject.currentTime -= 10;
  }

  function forward() {
    audioObject.currentTime += 10;
  }

  function updateWidth() {
    barWidth = (audioObject.currentTime / audioObject.duration) * 100;

    paused = audioObject.paused;
  }

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  function stop() {
    audioObject.currentTime = 0;
    audioObject.pause();
  }
</script>

{#if app.openedFile}
  <audio
    src={url}
    controls
    bind:this={audioObject}
    bind:duration
    bind:currentTime={current}
    on:timeupdate={updateWidth}
    autoplay
  />
  {#if audioObject}
    <div class="media-player">
      <div class="controls">
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
        <div class="group">
          <button class="material-icons-round" on:click={rewind}
            >fast_rewind</button
          >
          <button class="material-icons-round" on:click={forward}
            >fast_forward</button
          >
        </div>
        <button class="material-icons-round" on:click={stop}>stop</button>

        <div class="right">{formatTime(current)} / {formatTime(duration)}</div>
      </div>
      <div class="bar">
        <div class="inner" style="width: {barWidth}%;" />
      </div>
      <div class="filename" title={app.openedFile.path}>
        <img
          src={getMimeIcon(app.openedFile.name)}
          alt={app.openedFile.name}
        />{app.openedFile.path}
      </div>
    </div>
  {/if}
{/if}
