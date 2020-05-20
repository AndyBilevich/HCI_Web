<template>
  <div>
    <h1>Rooms</h1>
    <v-row dense>
      <v-col cols="2" v-for="d in devices" :key="d.id">
          <CategoryCard :categoryName="d.name" :categoryIcon="d.icon" :whereTo="d.link" />
      </v-col>
    </v-row>

    <router-link class="routerLink" to="/add_room">
      <v-btn class="add_btn" color="primary" fab big bottom right>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </router-link>
  </div>
</template>

<script>
  import { RoomApi } from '@/api';
  import CategoryCard from "@/components/CategoryCard";
  export default {
    name: 'Rooms',
    props: {
      home_id: String,
    },
    components: {
      CategoryCard
    },
    mounted: function() {
      this.updateRooms();
    },
    data: function() {
      return {
        hidden: false,
        devices: [],
      }
    },
    methods: {
      updateRooms: async function() {
        console.log("fetching rooms");
        try {
          const ans = await RoomApi.getAll();
          this.rooms = ans.result; 
        }
        catch(err) {
          console.log(`ERROR: ${err}`);
        }
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
}
</style>
