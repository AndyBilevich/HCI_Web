<template>
  <div class="editRoom">
    <h1 align="left">Edit Room</h1>

    <v-row dense> 
      <v-col cols="4">
          <h3 align="left">Name:</h3>
          <v-text-field
            v-model="room.name"
            label="Name:"
            solo
          ></v-text-field>
          <h3 align="left">Image:</h3>
          <AddRoomCard :givenIconName="$route.params.icon" @upd_icon="updateIcon"></AddRoomCard>
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="4">
          <h3 align="left">Description (optional):</h3>
          <v-text-field
            v-model="room.meta.desc"
            label="description"
            solo
          ></v-text-field>

          <v-col>
            <v-row > 
              <h3 class="pt-5">Select House:</h3>
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
      <v-btn @click="editRoom" class="my-2" depressed large color="primary">Save</v-btn>
    </v-row>

  </div>
</template>

<script>
  import router from '@/router';
  import {  RoomApi, Room ,HomeApi,  HomeRoomApi} from '@/api';
  import AddRoomCard from '@/components/AddRoomCard.vue';
  export default {
    components: {
      AddRoomCard
    },
    props: {
      home_id: String,
    },
    created: async function(){
      this.retrieveHomes();
      this.room.id = this.$route.params.id;
      await this.retrieveRoom(this.room.id);
      console.log(this.selectedIcon);
    },
    data: function() {
      return {
        room:{ meta: {} },
        selectedIcon: '',
        originalHomeID: this.home_id || '',
        selectedHomeID: this.home_id || '',
        homes: [],
      }
    },
    
    methods:{
        back: function() {
            router.go(-1);
        },
        retrieveHomes: async function() {
          try {
            const ans = await HomeApi.getAll();
            this.homes = [ {text:"None", value:"" } ]; 
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
        updateIcon: function(icon) {
            this.selectedIcon = icon;
        },
        editRoom: async function(){            
            const room = new Room(
                this.room.id,
                this.room.name,
                {
                    desc: this.room.meta.desc,
                    icon: this.selectedIcon,
                }   
            );
            try {
                await RoomApi.modify(room);
                console.log(this.originalHomeID);
                console.log(this.selectedHomeID);
                if(this.originalHomeID != this.selectedHomeID){
                  await HomeRoomApi.delete(this.room.id,);
                  if(this.selectedHomeID != ""){
                    await HomeRoomApi.add(this.selectedHomeID, this.room.id,);
                  }
                  router.go(-1);
                }
            } catch (err) {
                console.log(err);
            }
            
            this.back();
        },
        retrieveRoom: async function(id){
            const ans = await RoomApi.get(id);
            this.room = ans.result;
            this.selectedIcon = this.room.meta.icon;
        }

    },
  }
</script>
