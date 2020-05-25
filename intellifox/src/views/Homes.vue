
<template>
  <div class="homes">
    <h1 align="center">Homes</h1>
    <div v-if="homes.length === 0">
      <v-row class="d-flex justify-center">
        <h3 class="noItemsMessage" align="center"> {{noItemsText}} </h3>
      </v-row>
    </div>
    <div v-else>
      <v-container>
        <v-row dense>
          <v-col v-for="h in homes" :key="h.id" cols="6">
            <HomeCard 
              class="card" 
              @update="retrieveHomes" 
              :selected="selectedHomeID === h.id" 
              :home="h" 
              @click.native="() => {selectedHomeID = h.id;}"/>
          </v-col>
        </v-row>
      </v-container>
    </div>
            
    <router-link class="routerLink" to="/homes/add">
      <v-btn class="add_btn" color="primary" fab big bottom right>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </router-link>
    
  </div>
</template>
   
<script>
// @ is an alias to /src
import storage from '@/storage';
import HomeCard from '@/components/HomeCard.vue';
import { HomeApi } from '@/api';
export default {
  name: 'Homes',
  components: {
    HomeCard
  },
  mounted: async function() {
    await this.retrieveHomes();
    const home = await storage.getActualHome();
    if (home)
      this.selectedHomeID = home.id;
  },
  data: function() {
    return {
      noItemsText: "",
      selectedHomeID: '',
      homes: [],
    }
  },
  methods: {
    retrieveHomes: async function() {
      try {
        const ans = await HomeApi.getAll();
        this.homes = ans.result; 
      }
      catch(err) {
        console.log(err);
      }
      this.noItemsText = "You don't have houses yet. Add one with the bottom right button."
    }
  },
  watch: {
    selectedHomeID: function(new_val) {
      this.$emit('update_home', new_val);
    }
  }
};
</script>

<style scoped>
.homes {
  padding: 10,
}
.card {
  margin: 20;
  cursor: pointer;
}
.title {
  margin-left: 35px;
}
.add_btn {
  position: absolute;
  bottom: 7%;
  left: 88%;
  float: right;
}
</style>
a