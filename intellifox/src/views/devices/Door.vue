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
    const query = this.$route.query;
    if (query)
      this.home_id = query.home_id
    console.log(`HOME_ID is ${this.home_id}`)
    this.retrieveDevices();    
  },
  data: function() {
    return {
      home_id: '',
      doors: [],
    }
  },
  methods: {
    retrieveDevices: async function() {
      try {      
        const ans2 = await DeviceApi.getDevicesByType('lsf78ly0eqrjbz91');
        ans2.result.forEach(d => {
          if (d.room && d.room.home)
            console.log(JSON.stringify(d.room.home.id));
        });
        this.doors = ans2.result
          .filter(d => {
            return !d.room || ( d.room.home && d.room.home.id === this.home_id )
          });
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
