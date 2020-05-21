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
          <AddRoomCard @upd_icon="updateIcon"></AddRoomCard>
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="4">
          <h3 align="left">Description (optional):</h3>
          <v-text-field
            v-model="room.desc"
            label="description"
            solo
          ></v-text-field>
          
      </v-col>
    </v-row>


    <v-row>
      <v-col cols="10"></v-col>
      <v-btn @click="back" class="ma-2" outlined large color="primary">Cancel</v-btn>
      <v-btn @click="saveRoom" class="my-2" depressed large color="primary">Save</v-btn>
    </v-row>

  </div>
</template>

<script>
  import router from '@/router';
  import {  RoomApi, Room } from '@/api';
  import AddRoomCard from '@/components/AddRoomCard.vue';
  export default {
    name: 'AddRoom',
    props: {
      home_id: String,
    },
    components: {
      AddRoomCard
    },
    created() {
      this.retrieveHomes();
    },
    data: function() {
      return {
        room:{ meta: {} },
        selectedIcon: 'mdi-rhombus-split',
      }
    },
    
    methods:{
        
        back: function() {
            router.go(-1);
        },

        updateIcon: function(ico) {
            this.selectedIcon = ico;
        },
        editRoom: async function(){            
            const room = new Room(
                this.room.id,
                this.room.name,
                {
                    desc: this.room.desc,
                    icon: this.room.selectedIcon,
                }   
            );
            try {
                await RoomApi.modify(room) 
            } catch (err) {
                console.log(err);
            }
            
            this.back();
        },
        retrieveRoom: async function(id){
            const ans = await RoomApi.get(id);
            this.room = ans.result;
        }

    },
    mounted: function(){
        this.room.id = this.$route.params.id
        this.retrieveRoom(this.room.id)
    }
  }
</script>
