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
      <v-col cols="10"></v-col>
      <v-btn @click="back" class="ma-2" outlined large color="primary">Cancel</v-btn>
      <v-btn @click="EditDevice" class="my-2" depressed large color="primary">Save</v-btn>
    </v-row>

  </div>
</template>

<script>
  import router from '@/router';
  import { HomeRoomApi, DeviceApi, Device, RoomDeviceApi } from '@/api';
  export default {
    name: 'Devices',
    props: {
      home_id: String,
    },
    mounted: function() {
      this.retrieveRooms();
      this.device.id = this.$route.query.id;
      this.retrieveDevice(this.device.id);
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
        }
      }
    },
    methods: {
      back: function() {
        router.go(-1);
      },
      retrieveRooms: async function() {
        try {
          const ans = await HomeRoomApi.get(this.home_id);
          this.rooms = [ {text: 'None' , value: 'none'} ];
          ans.result.forEach(room => {
            this.rooms.push({
              text: room.name,
              value: room.id,
            })
          }) 
        }
        catch(err) {
          console.log(err);
        }
      },
      retrieveDevice: async function(id){
          const ans = await DeviceApi.get(id);
          this.device = ans.result;
      },
      EditDevice: async function() {
        const device = new Device(
          this.device.id,
          {
            id: this.device.type.id,
          },
          this.device.name,
          {
            desc: this.device.meta.desc,
          }
        );
        try {
          const ans = await DeviceApi.modify(device);
          if (this.originalRoomID != 'none'){
              await RoomDeviceApi.delete(ans.result.id);
          }
          if (ans && this.selectedRoomID != 'none'){
              await RoomDeviceApi.add(this.selectedRoomID, ans.result.id);
          }
        } catch (err) {
          console.log(err);
        }
        this.back();
      }
    }
  }
</script>
