<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/desktop/apps/mediaplayer.css";
  import { getMimeIcon } from "../../ts/api/fs/icon";
  import type { App, Process } from "../../ts/applogic/interface";
  import { registerShortcuts } from "../../ts/applogic/keyboard/main";
  import { AppStore } from "../../ts/applogic/store";

  let audioObject: HTMLAudioElement;

  export let process: Process;
  let barWidth = 0;

  let duration = 0;
  let current = 0;
  let url = "";
  let filename = "";
  let paused = true;

  AppStore.subscribe(() => {
    if (
      !process.openedFile ||
      !audioObject ||
      filename == process.openedFile.name
    )
      return;

    filename = process.openedFile.name;

    url = URL.createObjectURL(
      new Blob([process.openedFile.data], { type: process.openedFile.mime })
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

  onMount(() => {
    registerShortcuts(process.id, [
      {
        key: "space",
        action: () => {
          audioObject?.pause();
        },
      },
    ]);
  });
</script>

{#if process.openedFile}
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
      <div class="filename" title={process.openedFile.path}>
        <img
          src={getMimeIcon(process.openedFile.name)}
          alt={process.openedFile.name}
        /><span>{process.openedFile.path}</span>
      </div>
    </div>
  {/if}
{/if}
