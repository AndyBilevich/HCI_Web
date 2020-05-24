<template>
  <div class="alarms">
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>Alarms</h1>
    </v-row>
    <v-container>
      <v-row dense>
        <v-col v-for="a in alarms" :key="a.id" cols="6">
          <AlarmCard @upd_model="updateModel" @upd_devs="retrieveDevices"  :model="a"></AlarmCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { DeviceApi } from '@/api';
import AlarmCard from "@/components/devices/AlarmCard.vue";
export default {
  components: {
    AlarmCard,
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
      alarms: [],
    }
  },
  methods: {
    retrieveDevices: async function() {
      try {      
        const ans2 = await DeviceApi.getDevicesByType('mxztsyjzsrq7iaqc');
        this.alarms = ans2.result
          .filter(d => {
            return !d.room || !d.room.home || d.room.home.id === this.home_id 
          });
      }
      catch(err) {
        console.log(err);
      }
    },
    updateModel: function(newModel) {
      this.alarms[this.alarms.map((x, i) => [i, x]).filter(x => x[1].id == newModel.id)[0][0]] = newModel; 
    }
  },  
};
</script>

