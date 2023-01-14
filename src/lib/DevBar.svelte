<script lang="ts">
  import { onMount } from "svelte";
  import "../css/devbar.css";
  import { ConnectedServer } from "../ts/api/main";
  import { currentSettingsPage } from "../ts/applogic/apps/SettingsApp/main";
  import { appShortcuts } from "../ts/applogic/keyboard/main";
  import { getOpenedStore, WindowStore } from "../ts/applogic/store";
  import { log, LogLevel } from "../ts/console";
  import { ErrorWindowStore } from "../ts/errorlogic/app";
  import { CurrentFTSState } from "../ts/fts/main";
  import { CurrentLoginState, loginUsername } from "../ts/login/main";
  import { NotificationStore } from "../ts/notiflogic/main";

  import { CurrentState } from "../ts/state/main";
  import { UserData, UserName } from "../ts/userlogic/interfaces";
  import { ProfilePictures } from "../ts/userlogic/pfp";
  import { Wallpapers } from "../ts/userlogic/wallpapers";

  export let opened = false;

  let props: [string, boolean | string | number][] = [];
  let status = "";

  const mutators = [
    CurrentState,
    WindowStore,
    UserName,
    loginUsername,
    UserData,
    ConnectedServer,
    CurrentFTSState,
    CurrentLoginState,
    NotificationStore,
    currentSettingsPage,
    ErrorWindowStore,
  ];

  let statusTimeout;

  onMount(() => {
    for (let i = 0; i < mutators.length; i++) {
      mutators[i].subscribe(updateProps);
    }
  });

  log.subscribe(() => {
    clearTimeout(statusTimeout);
    const item = $log[$log.length - 1];

    status = `[${$log.length - 1} | ${item.timestamp}] [${LogLevel[
      item.level
    ].toUpperCase()}] ${item.source}: ${item.msg} `;

    statusTimeout = setTimeout(() => {
      status = "(idle)";
    }, 3000);
  });

  function updateProps() {
    props = [];

    setTimeout(() => {
      props = [
        ["CurrentState", $CurrentState.key],
        ["WindowStore", $WindowStore.length + " apps"],
        ["OpenedStore", getOpenedStore().length + " apps"],
        ["ErrorStore", $ErrorWindowStore.length + " errors"],
        ["Username", $UserName || "<none>"],
        ["LoginUsername", $loginUsername || "<none>"],
        ["IsUser", !!$UserData],
        ["APIHost", localStorage.getItem("arcos-server") || "<none>"],
        ["FTSState", $CurrentFTSState ? $CurrentFTSState.key : "<unloaded>"],
        [
          "LoginState",
          $CurrentLoginState ? $CurrentLoginState.key : "<unloaded>",
        ],
        [
          "SettingsPage",
          $currentSettingsPage ? $currentSettingsPage.name : "<unopened>",
        ],
        ["NotificationStore", Object.keys($NotificationStore).length],
        ["KeyShortcuts", appShortcuts.length],
        ["Wallpapers", Object.keys(Wallpapers).length],
        ["ProfileImages", Object.keys(ProfilePictures).length],
        ["Logger", $log.length + " entries"],
      ];
    });
  }
</script>

{#if import.meta.env.DEV}
  <div class="devbar" class:opened on:click={() => (opened = !opened)}>
    <p class="title">
      <b>ArcOS Development Environment</b> | {import.meta.env.MODE} @ {location.hostname}
    </p>
    <div class="lastlog">{status}</div>
  </div>
  <div class="devmode-propertylist">
    <div class="props">
      {#each props as prop}
        <p class="prop"><span class="key">{prop[0]}</span>{prop[1]}</p>
      {/each}
    </div>
  </div>
{/if}
