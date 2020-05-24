<template>
  <div class="addRoom">
    <h1 align="left">Add Room</h1>

    <v-row dense> 
      <v-col cols="4">
          <h3 align="left">Name:</h3>
          <v-text-field
            v-model="name"
            label="Name:"
            solo
          ></v-text-field>
          <h3 align="left">Image:</h3>
          <AddRoomCard @upd_icon="updateIcon"></AddRoomCard>
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="4">
          <h3 align="left">Description (optional):</h3>
          <v-text-field
            v-model="desc"
            label="description"
            solo
          ></v-text-field>
          <v-col>
            <v-row > 
              <h3 class="pt-5">Select house:</h3>
              <v-col cols="8">
              <v-overflow-btn 
                  solo
                  v-model="selectedHomeID"
                  :items="homes"
                  label="None"
                  color="background1"
              ></v-overflow-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-col>
      </v-row>


    <v-row>
      <v-col cols="10"></v-col>
      <v-btn @click="back" class="ma-2" outlined large color="primary">Cancel</v-btn>
      <v-btn @click="addRoom" class="my-2" depressed large color="primary">Save</v-btn>
    </v-row>

  </div>
</template>

<script>
  import storage from '@/storage';
  import router from '@/router';
  import { HomeApi, RoomApi, Room, HomeRoomApi } from '@/api';
  import AddRoomCard from '@/components/AddRoomCard.vue';
  export default {
    name: 'AddRoom',
    components: {
      AddRoomCard
    },
    created: async function() {
      const home = await storage.getActualHome();
      this.home_id = home?home.id:'';
      this.selectedHomeID = this.home_id
      this.retrieveHomes();
    },
    data: function() {
      return {
        name:"",
        desc:"",
        selectedIcon: 'mdi-rhombus-split',
        selectedHomeID: '',
        homes: [],
        home_id: '',
      }
    },
    methods:{
      back: function() {
        router.go(-1);
      },
      retrieveHomes: async function() {
        try {
          const ans = await HomeApi.getAll();
          this.homes = [ {text:"None", value:'' } ]; 
          ans.result.forEach(h => {
            this.homes.push({
              text: h.name,
              value: h.id,
            });
          })
        }
        catch(err) {
          console.log(err);
        }
      },
      updateIcon: function(ico) {
        this.selectedIcon = ico;
      },
      addRoom: async function(){
        
        const room = new Room(
          null,
          this.name,
          {
            desc: this.desc,
            icon: this.selectedIcon,
          }
        );
        try {
          const ans = await RoomApi.add(room);
          if(this.selectedHomeID != ''){
            await HomeRoomApi.add(this.selectedHomeID, ans.result.id);
            
            const ans2 = await HomeApi.get(this.selectedHomeID);
            var auxHome = ans2.result;
            
            auxHome.meta.rooms = auxHome.meta.rooms + 1;
            await HomeApi.modify(auxHome);

          }
        } catch (err) {
          console.log(err);
        }
        
        this.back();
      }
    },
  }
</script>
