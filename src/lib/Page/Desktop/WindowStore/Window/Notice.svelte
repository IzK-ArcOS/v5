<script lang="ts">
  import "@css/desktop/window/notice.css";
  export let title: string;
  export let text: string;
  export let icon: string;
</script>

<div class="notice">
  <div>
    <span class="material-icons-round">{icon}</span>
  </div>
  <div>
    <p class="title">{title}</p>
    <p class="message">{@html text}</p>
  </div>
</div>
