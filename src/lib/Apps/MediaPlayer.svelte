<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/desktop/apps/mediaplayer.css";
  import { arrayToBlob } from "../../ts/api/fs/file/conversion";
  import type { ArcFile } from "../../ts/api/interface";
  import { isOpened } from "../../ts/applogic/checks";
  import type { App } from "../../ts/applogic/interface";
  import { registerShortcuts } from "../../ts/applogic/keyboard/main";
  import { WindowStore } from "../../ts/applogic/store";
  import Audio from "./MediaPlayer/Audio.svelte";
  import File from "./MediaPlayer/File.svelte";
  import PlayPause from "./MediaPlayer/PlayPause.svelte";
  import Scrub from "./MediaPlayer/Scrub.svelte";
  import Stop from "./MediaPlayer/Stop.svelte";
  import Time from "./MediaPlayer/Time.svelte";

  export let app: App;

  let audioObject: HTMLAudioElement;
  let file: ArcFile;
  let barWidth = 0;
  let duration = 0;
  let current = 0;
  let url = "";
  let filename = "";
  let paused = true;

  WindowStore.subscribe(() => {
    if (!app.openedFile || !audioObject || filename == app.openedFile.name)
      return;

    file = app.openedFile;
    filename = file.name;

    url = URL.createObjectURL(arrayToBlob(file.data, file.mime));

    if (!isOpened(app.id)) return;

    setTimeout(() => {
      audioObject.play();
    });
  });

  function updateWidth() {
    barWidth = (audioObject.currentTime / audioObject.duration) * 100;

    paused = audioObject.paused;
  }

  function stop() {
    if (!audioObject) return;

    audioObject.currentTime = 0;
    audioObject.pause();
  }

  onMount(() => {
    if (!app.events) app.events = {};

    app.events.close = () => {
      stop();
    };

    app.events.openFile = () => {
      if (!isOpened(app.id)) return;

      if (!file) file = app.openedFile;

      filename = file.name;

      url = URL.createObjectURL(arrayToBlob(file.data, file.mime));

      setTimeout(() => {
        audioObject.play();
      });
    };

    registerShortcuts([
      {
        key: "space",
        action: () => {
          if (!audioObject) return;

          audioObject.pause();
        },
      },
    ]);
  });
</script>

{#if file}
  <Audio {url} bind:audioObject bind:duration bind:current {updateWidth} />
  {#if audioObject}
    <div class="media-player">
      <div class="controls">
        <PlayPause {audioObject} {paused} {barWidth} />
        <Scrub {audioObject} />
        <Stop {stop} />
        <Time {duration} {current} />
      </div>
      <div class="bar">
        <div class="inner" style="width: {barWidth}%;" />
      </div>
      <File {file} />
    </div>
  {/if}
{:else}
  <div class="markdownrenderer">
    <h3>Error playing file</h3>
    <p>Media Player did not receive a file to play...</p>
  </div>
{/if}
