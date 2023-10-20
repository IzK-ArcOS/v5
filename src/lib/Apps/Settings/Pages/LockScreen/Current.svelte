<script lang="ts">
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  import { getWallpaper } from "../../../../../ts/userlogic/wallpapers/main";
  let url = "";

  UserData.subscribe(async () => {
    url = (await getWallpaper($UserData.acc.loginBackground || "img15")).url;
  });
</script>

<div class="current" style="background-image: url({url});" />
