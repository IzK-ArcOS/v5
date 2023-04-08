<script lang="ts">
  import { onMount } from "svelte";
  import { getDirectory } from "../../../../../ts/api/fs/directory";
  import { readFile } from "../../../../../ts/api/fs/file";
  import sleep from "../../../../../ts/sleep";
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  import Wallpaper from "./FilesystemWallpapers/Wallpaper.svelte";

  let wallpapers: { path: string; url: string }[] = [];
  let loading = false;

  UserData.subscribe(update);

  async function update() {
    const temp = [];

    const dir = await getDirectory("./Wallpapers");

    if (!dir) return;

    for (let i = 0; i < dir.files.length; i++) {
      const file = dir.files[i];

      const { scopedPath, mime } = file;

      if (!mime.startsWith("image")) continue;

      const contents = await readFile(scopedPath);

      if (!contents) continue;

      temp.push({
        path: scopedPath,
        url: await createUrl(contents),
      });
    }

    await sleep(5);

    if (temp.length != wallpapers.length) {
      loading = true;

      wallpapers = temp;

      setTimeout(() => {
        loading = false;
      });
    }
  }

  async function createUrl(file: ArrayBuffer) {
    const blob = new Blob([new Uint8Array(file)], { type: "image/*" });

    return URL.createObjectURL(blob);
  }
</script>

{#if wallpapers && !loading}
  {#each wallpapers as wallpaper}
    <Wallpaper {wallpaper} />
  {/each}
{/if}
