<template>
  <v-card @click="goTo" class="routerLink card cards text-center" height="200px" width="170px">
    <div class="card_top">
      <v-icon size="130" class="background2--text">{{categoryIcon}}</v-icon>
    </div>
    <div class="card_bottom background1">
      <v-card-text class="text--primary">{{categoryName}}</v-card-text>
    </div>
  </v-card>
</template>

<script>
import router from '@/router';
export default {
  data: function() {
    return {
      hidden: false
    }
  },
  props: {
    home_id: String,
    categoryName: String,
    categoryIcon: String,
    routePath: String
  },
  methods: {
    goTo: async function() {
      router.push({path: this.routePath, query: {home_id: this.home_id}})
    }
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