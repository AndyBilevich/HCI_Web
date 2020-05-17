<template>
  <div class="loader">
    <div class="inside_loader">Loading...</div>
  </div>
</template>

<script>
export default {
  name: "loader"
};
</script>

<style scoped>
.loader {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10000;
  background2-color: white;
}
.inside_loader {
  margin-left: auto;
  margin-right: auto;
}
</style>