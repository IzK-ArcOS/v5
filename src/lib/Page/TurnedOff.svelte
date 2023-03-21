<script lang="ts">
  import safetoturnoff from "../../assets/bg/safetoturnoff.png";
</script>

<div>
  <img src={safetoturnoff} alt="It's now safe to turn off your computer." />
</div>

<style scoped>
  div {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div img {
    height: 100%;
  }
</style>
