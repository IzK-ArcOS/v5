<script lang="ts">
  import { onMount } from "svelte";
  import { getDirectory } from "../../../../../ts/api/fs/directory";
  import { readFile } from "../../../../../ts/api/fs/file";
  import sleep from "../../../../../ts/sleep";
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  import Wallpaper from "./FilesystemWallpapers/Wallpaper.svelte";
  import { Busy } from "../../../../../ts/env/main";

  let wallpapers: { path: string; url: string }[] = [];
  let loading = false;
  let count = 0;

  UserData.subscribe(update);

  async function update() {
    loading = true;
    Busy.set(true);
    const temp = [];

    if ((await getFiles()).length == count) return;

    count = 0;

    const dir = await getDirectory("./Wallpapers");

    if (!dir) return;

    for (let i = 0; i < dir.files.length; i++) {
      const file = dir.files[i];

      const { scopedPath: scopedPath, mime } = file;

      if (!mime.startsWith("image")) continue;

      count++;

      const contents = await readFile(scopedPath);

      if (!contents) continue;

      temp.push({
        path: scopedPath,
        url: await createUrl(contents),
      });
    }

    await sleep(5);

    if (temp.length != wallpapers.length) {
      wallpapers = temp;

      setTimeout(() => {
        loading = false;
        Busy.set(false);
      });
    }
  }

  async function createUrl(file: ArrayBuffer) {
    const blob = new Blob([new Uint8Array(file)], { type: "image/*" });

    return URL.createObjectURL(blob);
  }

  async function getFiles(): Promise<string[]> {
    const result = [];
    const dir = await getDirectory("./Wallpapers");

    if (!dir) return [];

    for (let i = 0; i < dir.files.length; i++) {
      const file = dir.files[i];

      const { mime } = file;

      if (!mime.startsWith("image")) continue;

      result.push(file.scopedPath);
    }

    return result;
  }
</script>

{#if !loading}
  {#each wallpapers as wallpaper}
    <Wallpaper {wallpaper} />
  {/each}
{/if}
