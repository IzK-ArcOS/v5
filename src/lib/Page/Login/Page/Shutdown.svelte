<script lang="ts">
  import "../../../../css/login/userlogin.css";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { applyLoginState } from "../../../../ts/login/main";
  import { UserData, UserName } from "../../../../ts/userlogic/interfaces";
  import { getUserdata } from "../../../../ts/userlogic/main";
  import profile from "../../../../assets/pfp/null.png";
  import Spinner from "../../../../lib/Spinner.svelte";
  import { BugReportData } from "../../../../ts/bugrep";
  import { applyState } from "../../../../ts/state/main";

  let name: string;
  let data: UserData;

  onMount(() => {
    name = get(UserName);
    data = getUserdata(name);

    setTimeout(() => {
      UserName.set(undefined);

      BugReportData.set([
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
      ]);

      applyState("blank");
    }, 2000);
  });
</script>

<div class="userlogin">
  <img src={profile} alt="pfp" />
  <h1>{name || "ArcOS"}</h1>
  <h3><Spinner height={23} />&nbsp;<span>Shutting down</span></h3>
</div>
