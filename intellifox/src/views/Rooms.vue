<template>
  <div>
    <h1 align="center">Rooms</h1>
    <div v-if="rooms.length === 0">
        <h3 class="noItemsMessage mt-5" align="center"> {{noItemsText}} </h3>
    </div>
    <div v-else>
      <v-row dense>
        <v-col cols="2" v-for="r in rooms" :key="r.id">

            <CategoryCard :categoryName="r.name" :categoryIcon="r.meta.icon" :routePath="`/rooms/${r.id}`" />
        </v-col>
      </v-row>
    </div>
      <router-link class="routerLink" to="/rooms/add">
        <v-btn class="add_btn" color="primary" fab big bottom right>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </router-link>


  </div>
</template>


<script>
  import storage from '@/storage';
  import { HomeRoomApi, RoomApi } from '@/api';
  import CategoryCard from "@/components/CategoryCard";
  export default {
    name: 'Rooms',
    components: {
      CategoryCard
    },
    mounted: async function() {
      const home = await storage.getActualHome();
      this.home_id = home?home.id:'';
      this.retrieveRooms();
    },
    data: function() {
      return {
        noItemsText: "",
        hidden: false,
        rooms: [],
        home_id: {}
      }
    },
    methods: {
      retrieveRooms: async function() {
        if (this.home_id) {
          try {
            const ans = await HomeRoomApi.get(this.home_id);
            this.rooms = ans.result;
            const ans2 = await RoomApi.getAll();
            var i;
            for (i = 0; i < ans2.result.length; i++) {
                if(!ans2.result[i].home){
                    this.rooms.push( ans2.result[i] );
                }
            }
          }
          catch(err) {
            console.log(err);
          }
        }
        this.noItemsText = "You don't have rooms yet. Add one with the bottom right button."
      }
    }
  };
</script>

<style>
.add_btn {
  position: absolute;
  bottom: 7%;
  left: 88%;
  float: right;
},
.noItemsMessage{
  position: absolute;
  bottom: 50%,

}
</style>
