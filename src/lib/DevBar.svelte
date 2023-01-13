<script lang="ts">
  import "../css/devbar.css";
  import { ConnectedServer } from "../ts/api/main";
  import { WindowStore } from "../ts/applogic/store";
  import { loginUsername } from "../ts/login/main";

  import { CurrentState } from "../ts/state/main";
  import { UserData, UserName } from "../ts/userlogic/interfaces";

  let opened = false;

  const props: [string, string | boolean | number][] = [
    ["CurrentState", $CurrentState.key],
    ["apps", $WindowStore.length],
    ["username", $UserName || "<none>"],
    ["loginUsername", $loginUsername || "<none>"],
    ["isUser", !!$UserData],
    ["APIHost", $ConnectedServer || "<none>"],
  ];
</script>

{#if import.meta.env.DEV}
  <div class="devbar" class:opened on:click={() => (opened = !opened)}>
    <p class="title">Running in development environment (click to hide)</p>
    <div class="props">
      {#each props as prop}
        <span class="prop"><span class="key">{prop[0]}</span>{prop[1]}</span>
      {/each}
    </div>
  </div>
{/if}
