<script lang="ts">
  import { defaultQuota, getFSQuota } from "../../../../ts/api/fs/quota";
  import { formatBytes } from "../../../../ts/api/fs/sizes";
  import type { FSQuota } from "../../../../ts/api/interface";
  import { FileBrowserDirContents } from "../../../../ts/applogic/apps/FileBrowser/main";

  let quota: FSQuota = defaultQuota;
  let width = 0;

  FileBrowserDirContents.subscribe(refresh);

  async function refresh() {
    quota = await getFSQuota();

    width = Math.round((100 / quota.max) * quota.used);
  }
</script>

<div class="quota-renderer">
  <div class="bar">
    <div class="inner" style="width: {width}%;" />
  </div>
  <div class="stat">
    <span class:invalid={quota.used > quota.max} title="{quota.used}B"
      >{formatBytes(quota.used)}</span
    >
    <div class="right">{formatBytes(quota.max)}</div>
  </div>
</div>
