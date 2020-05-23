<template>
  <div class="tap">
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>Taps</h1>
    </v-row>
    <v-container>
      <v-row dense>
        <v-col v-for="t in taps" :key="t.id" cols="6">
          <WaterCard @upd_model="updateModel" :model="t"></WaterCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { DeviceApi } from '@/api';
import WaterCard from "@/components/devices/WaterCard.vue";
export default {
  components: {
   WaterCard,
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
      taps: [],
    }
  },
  methods: {
    retrieveDevices: async function() {
      try {      
        const ans2 = await DeviceApi.getDevicesByType('dbrlsh7o5sn8ur4i');
        ans2.result.forEach(t => {
          if (t.room && t.room.home)
            console.log(JSON.stringify(t.room.home.id));
        });
        this.taps = ans2.result
          .filter(t => {
            return !t.room || ( t.room.home && t.room.home.id === this.home_id )
          });
      }
      catch(err) {
        console.log(err);
      }
    },
    updateModel: function(newModel) {
      this.taps[this.taps.map((x, i) => [i, x]).filter(x => x[1].id == newModel.id)[0][0]] = newModel; 
    }
  },  

};
</script>
