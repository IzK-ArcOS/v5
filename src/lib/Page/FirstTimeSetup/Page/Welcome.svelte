<script lang="ts">
  import { projName } from "../../../../ts/env/main";
  import Nav from "../Nav.svelte";
</script>

<div class="header">
  <h1>Welcome to {projName}!</h1>
  <p class="subtitle">Let's get you started.</p>
</div>
<br />
<p>
  This setup will help you get ArcOS configured just how you want it. So, when
  you're ready, go ahead and get started.
</p>
<Nav
  data={{
    back: {
      disabled: true,
      redir: "",
    },
    forw: {
      disabled: false,
      redir: "servconn",
    },
    prog: {
      max: 4,
      val: 1,
    },
  }}
/>
