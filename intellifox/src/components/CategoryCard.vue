<template>
  <router-link class="routerLink" :to="whereTo">
    <v-card class="card cards text-center" height="200px" width="170px">
      <div class="card_top">
        <v-icon size="130" class="background--text">{{categoryIcon}}</v-icon>
      </div>
      <div class="card_bottom background_fill">
        <v-card-text class="text--primary">{{categoryName}}</v-card-text>
      </div>
    </v-card>
  </router-link>
</template>

<script>
export default {
  data: () => ({
    hidden: false
  }),
  props: {
    categoryName: String,
    categoryIcon: String,
    whereTo: String
  }
};
</script>
 
<style scoped>
  .card {
    margin: 20px;
    cursor: pointer;
  }
  .card_top {
    height: 75%;
    padding: 10px;
  }
  .card_bottom {
    position: relative;
    height: 25%;
    width: 100%;
  }
  .routerLink {
    text-decoration: none;
  }   
</style>