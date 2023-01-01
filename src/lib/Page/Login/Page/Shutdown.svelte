<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import "../../../../css/login/userlogin.css";
  import Spinner from "../../../../lib/Spinner.svelte";
  import { applyState } from "../../../../ts/state/main";
  import { UserData, UserName } from "../../../../ts/userlogic/interfaces";
  import { getUserdata } from "../../../../ts/userlogic/main";
  import { getProfilePicture } from "../../../../ts/userlogic/pfp";

  let name: string;
  let data: UserData;

  let pfp = "";

  onMount(async () => {
    name = get(UserName);
    data = await getUserdata(name);

    pfp = getProfilePicture(parseInt(data.acc.profilePicture as string));

    setTimeout(() => {
      UserName.set(undefined);

      /* BugReportData.set([
        true,
        {
          icon: "power_settings_new",
          title: "Powered off",
          message: "Thank you for using ArcOS! You can now close the browser.",
          button: {
            caption: "Restart",
            action: () => {
              applyLoginState("selector");
              applyState("boot");
            },
          },
        },
      ]); */

      applyState("turnedoff");
    }, 2000);
  });
</script>

<div class="userlogin">
  <img src={pfp} alt="pfp" />
  <h1>{name || "ArcOS"}</h1>
  <h3><Spinner height={23} />&nbsp;<span>Shutting down</span></h3>
</div>
