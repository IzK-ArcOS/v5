<script lang="ts">
  export let title: string;
  export let context: string;
</script>

<div class="section opt">
  <div>
    <h3 class="header">{title}</h3>
    <p class="context">{context}</p>
  </div>
  <div class="opt-sel">
    <slot />
  </div>
</div>
