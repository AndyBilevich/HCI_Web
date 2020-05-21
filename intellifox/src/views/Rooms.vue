<template>
  <div>
    <h1>Rooms</h1>
    <v-row dense>
      <v-col cols="2" v-for="r in rooms" :key="r.id">
          <CategoryCard :categoryName="r.name" :categoryIcon="r.meta.icon" :whereTo="`/rooms/${r.id}`" />
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
  import { HomeRoomApi } from '@/api';
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
      this.retrieveRooms();
    },
    data: function() {
      return {
        hidden: false,
        rooms: [],
      }
    },
    methods: {
      retrieveRooms: async function() {
        try {
          const ans = await HomeRoomApi.get(this.home_id);
          this.rooms = ans.result; 
        }
        catch(err) {
          console.log(err);
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
