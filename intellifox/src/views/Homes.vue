
<template>
  <div class="homes">
    <h1>Homes</h1>
    <v-container>
      <v-row dense>
        <v-col v-for="h in homes" :key="h.id" cols="6">
          <HomeCard class="card" :show="show" :selected="selectedHomeID === h.id" :name="h.name" :desc="h.meta.desc" @click.native="() => {selectedHomeID = h.id;}"/>
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
  components: {
    HomeCard
  },
  data: () => ({
    selectedHomeID: 1,
    homes: [],
    test_homes: [
      {
        id: 1,
        name: "Winter Cottage",
        desc: "Ski house for winter holidays"
      },
      {
        id: 2,
        name: "Summer House",
        desc: "In front of the sea"
      },
      {
        id: 3,
        name: "Home"
      }
    ]
  }),
  mounted: () => {
    console.log("Buscando madres de gabi");
    try {
      this.homes = this.getHomes();
    }
    catch {
      console.log("Gabi se rompio toda en la fiesta de anoche con su amiga no heterosexual");
    }
  },
  methods: {
    async getHomes(){
      const ans = await HomeApi.getAll();
      return ans.result;
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
