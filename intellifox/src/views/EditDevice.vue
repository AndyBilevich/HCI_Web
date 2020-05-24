<template>
  <div class="addDevice">
    <h1 align="left">Edit device</h1>

    <v-row dense> 
      <v-col cols="6">
          <h3 align="left">Name:</h3>
          <v-text-field
            v-model="device.name"
            label="Name"
            solo
          ></v-text-field>
      </v-col>
    </v-row>
  
    <v-row class="pl-2"> 
      <h3 class="pt-5">Select room:</h3>
      <v-col cols="3">
      <v-overflow-btn
          v-model="selectedRoomID"
          solo
          :items="rooms"
          label="None"
          color="background1"
      ></v-overflow-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="9"></v-col>
      <v-btn @click="back" class="ma-2" outlined large color="primary">Cancel</v-btn>
      <v-btn @click="EditDevice" class="my-2" depressed large color="primary">Save</v-btn>
    </v-row>

  </div>
</template>

<script>
  import storage from '@/router';
  import router from '@/router';
  import { HomeRoomApi, DeviceApi, Device, RoomDeviceApi, RoomApi } from '@/api';
  export default {
    name: 'Devices',
    created: async function() {
      const home = await storage.getActualHome();
      this.home_id = home?home.id:'';
      this.retrieveRooms();
      this.device.id = this.$route.params.id;
      this.retrieveDevice();
    },
    data: function() {
      return {
        name: '',
        desc: '',
        originalRoomID: this.$route.query.room,
        selectedRoomID: this.$route.query.room,
        rooms: [],
        device: {
          meta: {}
        },
        home_id: '',
      }
    },
    methods: {
      back: function() {
        router.go(-1);
      },
      retrieveRooms: async function() {
        try {
          const ans = await HomeRoomApi.get(this.home_id);
          const ans2 = await RoomApi.getAll();
          this.rooms = [];
          this.rooms.push({
            text: 'None',
            value: 'none',
          });
          ans.result.forEach(room => {
            this.rooms.push({
              text: room.name,
              value: room.id,
            });
          });
          ans2.result.forEach(room => {
            if(!room.home){
              this.rooms.push({
                text: room.name,
                value: room.id,
              });
            }
          });
        }
        catch(err) {
          console.log(err);
        }
      },
      retrieveDevice: async function(){
        try {
          const ans = await DeviceApi.get(this.device.id);
          this.device = ans.result; 
        } catch (err) {
          console.log(err);
        }
      },
      EditDevice: async function() {
        const device = new Device(
          this.device.id,
          {
            id: this.device.type.id,
          },
          this.device.name,
          { }
        );
        try {
          const ans = await DeviceApi.modify(device);
          if (this.originalRoomID != '' && this.originalRoomID != this.selectedRoomID){
              await RoomDeviceApi.delete(this.device.id);
          }
          if (ans && this.selectedRoomID != ''){
              await RoomDeviceApi.add(this.selectedRoomID, this.device.id);
          }
        } catch (err) {
          console.log(err);
        }
        this.back();
      }
    }
  }
</script>
