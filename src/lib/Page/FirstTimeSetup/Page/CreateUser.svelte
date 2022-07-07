<script lang="ts">
  import { projName } from "../../../../ts/env/main";
  import Nav from "../Nav.svelte";
</script>

<div class="header">
  <h1>Let's create a user</h1>
  <p class="subtitle">This is the first account.</p>
</div>
<br />
<p>
  Username:
  <input />
</p>
<Nav
  data={{
    back: {
      disabled: false,
      redir: "servconn",
    },
    forw: {
      disabled: false,
      redir: "j",
    },
  }}
/>
