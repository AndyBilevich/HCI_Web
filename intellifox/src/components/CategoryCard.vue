<template>
  <v-card @click="goTo" class="routerLink card cards text-center" height="200px" width="170px">
    <div class="card_top">
      <v-icon size="130" class="background2--text">{{categoryIcon}}</v-icon>
    </div>
    <div class="card_bottom background1">
      <div v-if= "categoryName.length <= 16">
        <v-card-text class="text--primary"> {{categoryName }}</v-card-text>
      </div>
      <div v-else>
        <v-card-text class="text--primary"> {{categoryName.substr(0,12) + "..."}}</v-card-text>
      </div>
        
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
    categoryName: String,
    categoryIcon: String,
    routeName: String,
    routePath: String,
    devName: String
  },
  methods: {
    goTo: async function() {
      if (this.devName) {
        if (this.routeName)
          router.push({name: this.routeName, params: {typeName: this.devName}});
        else
        router.push({path: this.routePath, params: {typeName: this.devName}});
      }
      else {
        if (this.routeName)
          router.push({name: this.routeName});
        else
          router.push({path: this.routePath});
      }
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