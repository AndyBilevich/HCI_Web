
<template>
  <div class="homes">
    <h1>Homes</h1>
    <v-container>
      <v-row dense>
        <v-col v-for="h in homes" :key="h.id" cols="6">
          <HomeCard 
            class="card" 
            @update="updateHomes" 
            :selected="selectedHomeID === h.id" 
            :home="h" 
            @click.native="() => {selectedHomeID = h.id;}"/>
        </v-col>
      </v-row>
    </v-container>
        
    <router-link class="routerLink" to="/add_home">
      <v-btn class="add_btn" color="primary" fab big bottom right>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </router-link>
    
  </div>
</template>
   
<script>
// @ is an alias to /src
import HomeCard from '@/components/HomeCard.vue';
import { HomeApi } from '@/api';
export default {
  name: 'Homes',
  props: {
    home_id: String,
  },
  components: {
    HomeCard
  },
  mounted: function() {
    this.updateHomes();
  },
  data: function() {
    return {
      selectedHomeID: this.home_id,
      homes: [],
    }
  },
  methods: {
    updateHomes: async function() {
      try {
        const ans = await HomeApi.getAll();
        this.homes = ans.result; 
      }
      catch(err) {
        console.log(`ERROR: ${err}`);
      }
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
