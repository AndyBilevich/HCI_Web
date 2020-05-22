<template>
  <div class="doors">
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>Doors</h1>
    </v-row>
    <v-container>
      <v-row dense>
        <v-col v-for="d in doors" :key="d.id" cols="6">
          <DoorCard @upd_model="updateModel" :model="d" class="card"></DoorCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { DeviceApi } from '@/api';
import DoorCard from "@/components/devices/DoorCard.vue";
export default {
  components: {
    DoorCard,
  },
  mounted: function() {
    this.retrieveDevices();    
  },
  data: function() {
    return {
      doors: [],
    }
  },
  methods: {
    retrieveDevices: async function() {
      try {
        const ans = await DeviceApi.getDevicesByType('lsf78ly0eqrjbz91');
        console.log(ans.result);
        this.doors = ans
          .filter(dt => {
            return !dt.room || ( dt.room.home && dt.room.home.id === this.home_id )
          })
        console.log(this.doors);
      }
      catch(err) {
        console.log(err);
      }
    },
    updateModel: function(newModel) {
      return newModel;
    }
  },  
};
</script>
