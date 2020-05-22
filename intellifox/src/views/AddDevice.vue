<template>
  <div class="addDevice">
    <h1 align="left">Add device</h1>

    <v-row dense> 
      <v-col cols="6">
          <h3 align="left">Name:</h3>
          <v-text-field
            v-model="name"
            label="Name"
            solo
          ></v-text-field>
      </v-col>
    </v-row>

    <h3 align="left">Device type:</h3>

    <v-row align="center">
      <v-col v-for="(d, idx) in devices" :key="idx" align="center">
        <AddDeviceButton 
          :selected="selectedDeviceIndex === idx" 
          :name="d.name" 
          :icon="d.icon" 
          @click.native="() => {selectedDeviceIndex = idx;}"
        />
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
      <v-btn @click="addDevice" class="my-2" depressed large color="primary">Save</v-btn>
    </v-row>

  </div>
</template>

<script>
  import router from '@/router';
  import { HomeRoomApi, DeviceApi, Device, RoomDeviceApi } from '@/api';
  import AddDeviceButton from '@/components/AddDeviceButton.vue';
  export default {
    name: 'Devices',
    props: {
      home_id: String,
    },
    components: {
      AddDeviceButton
    },
    mounted: function() {
      this.retrieveRooms();
    },
    data: function() {
      return {
        name: '',
        desc: '',
        selectedRoomID: '',
        rooms: [],
        selectedDeviceIndex: -1,
        devices: [
          {
            id: "go46xmbqeomjrsjr",
            name: "Light",
            icon: "mdi-lightbulb-on-outline"
          },
          {
            id: "li6cbv5sdlatti0j",
            name: "A/C",
            icon: "mdi-air-conditioner"
          },
          {
            id: "mxztsyjzsrq7iaqc",
            name: "Alarm",
            icon: "mdi-alarm-light-outline"
          },
          {
            id: "eu0v2xgprrhhg41g",
            name: "Blind",
            icon: "mdi-blinds"
          },
          {
            id: "lsf78ly0eqrjbz91",
            name: "Door",
            icon: "mdi-door"
          },
          {
            id: "rnizejqr2di0okho",
            name: "Fridge",
            icon: "mdi-fridge-outline"
          },
          {
            id: "im77xxyulpegfmv8",
            name: "Oven",
            icon: "mdi-toaster-oven"
          },
          {
            id: "c89b94e8581855bc",
            name: "Speaker",
            icon: "mdi-speaker"
          },
          {
            id: "ofglvd9gqx8yfl3l",
            name: "Vacuum",
            icon: "mdi-robot-vacuum"
          },
          {
            id: "dbrlsh7o5sn8ur4i",
            name: "Tap",
            icon: "mdi-water-pump"
          },
        ]
      }
    },
    methods: {
      back: function() {
        router.go(-1);
      },
      retrieveRooms: async function() {
        try {
          const ans = await HomeRoomApi.get(this.home_id);
          this.rooms = [];
          this.rooms.push({
            text: 'None',
            value: '',
          });
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
      addDevice: async function() {
        const device = new Device(
          null,
          {
            id: this.devices[this.selectedDeviceIndex].id,
          },
          this.name,
          {
            desc: this.desc,
          }
        );
        try {
          const ans = await DeviceApi.add(device);
          if (ans && this.selectedRoomID !== '')
            await RoomDeviceApi.add(this.selectedRoomID, ans.result.id);
        } catch (err) {
          console.log(err);
        }
        this.back();
      }
    }
  }
</script>



<style scoped>
  
</style>



