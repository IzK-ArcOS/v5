<script lang="ts">
  import "../../css/arctermonly.css";
  import "../../css/terminal/main.css";
  import { onMount } from "svelte";
  import { generateCredToken } from "../../ts/api/cred";
  import { loginUsingCreds } from "../../ts/api/getter";
  import { ArcTerm } from "../../ts/terminal/main";
  import { arcCommands } from "../../ts/terminal/store";
  import { UserData, UserName } from "../../ts/userlogic/interfaces";
  import Setting from "./Desktop/ActionCenter/QuickSettings/Setting.svelte";

  let arcterm: ArcTerm;
  let target: HTMLDivElement;

  onMount(async () => {
    const token = localStorage.getItem("arcos-remembered-token");

    if (!token) return location.reload();

    const [username, password] = atob(token).split(":");

    const userdata = await loginUsingCreds(
      generateCredToken({ username, password })
    );

    if (!userdata) return location.reload();

    UserData.set(userdata);
    UserName.set(username);

    setTimeout(() => {
      arcterm = new ArcTerm(target, arcCommands, null, (a) => {
        a.util.writeColor(
          "You are currently in [ArcTerm mode]. Some commands may not work as expected.",
          "orange",
          "red"
        );

        a.util.writeLine("\n");
      });
    }, 100);
  });

  function focus() {
    if (!arcterm || !arcterm.input || !arcterm.input.current) return;

    arcterm.input.current.focus();
  }

  setInterval(() => {
    focus();
  }, 10);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="target" class="terminal-renderer" bind:this={target} on:click={focus}>
  authenticating with ArcAPI...
</div>
