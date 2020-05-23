<template>
  <div class="air_conditioners">
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>Air Conditioners</h1>
    </v-row>
    <v-container>
      <v-row dense>
        <v-col v-for="a in acs" :key="a.id" cols="6">
          <AirConditionerCard @upd_model="updateModel" :model="a"></AirConditionerCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import { DeviceApi } from '@/api';
import AirConditionerCard from "@/components/devices/AirConditionerCard.vue";
export default {
  components: {
    AirConditionerCard,
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
      acs: [],
    }
  },
  methods: {
    retrieveDevices: async function() {
      try {      
        const ans2 = await DeviceApi.getDevicesByType('li6cbv5sdlatti0j');
        this.acs = ans2.result
          .filter(d => {
            return !d.room || !d.room.home || d.room.home.id === this.home_id 
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
