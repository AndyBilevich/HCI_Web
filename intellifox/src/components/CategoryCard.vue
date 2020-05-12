<template>
  <v-card class="card cards" height="200px" width="170px">
    <div>
      <v-icon size="150">{{category_icon}}</v-icon>
    </div>
    <div class="card_bottom background_fill">
      <v-card-text class="text--primary">{{category_name}}</v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    hidden: false
  }),
  props: {
    category_name: String,
    category_icon: String,
    url_to_go: String
  }
};
</script>
 
<style scoped>
.card {
  margin: 20px;
  cursor: pointer;
}
.card_bottom {
  position: relative;
  height: 50px;
  width: 100%;
}
</style>