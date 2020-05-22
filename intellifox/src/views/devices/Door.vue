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
          <DoorCard @upd_model="updateModel" :model="d"></DoorCard>
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
        this.doors = ans.result
          .filter(d => {
            return !d.room || ( d.room.home && d.room.home.id === this.home_id )
          })
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
