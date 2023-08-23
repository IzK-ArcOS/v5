<script lang="ts">
  import type { UserData } from "../../../../../ts/userlogic/interfaces";
  import Receivers from "./NewHeader/Receivers.svelte";
  import Title from "./NewHeader/Title.svelte";

  export let title: string;
  export let target: string[];
  export let users: [string, UserData][];
</script>

<div class="header">
  <Title bind:title />
  <Receivers {users} bind:receivers={target} />
</div>
