<template>
  <div class="lights">
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>Lights</h1>
    </v-row>
    <v-container>
      <v-row dense>
        <v-col v-for="l in lights" :key="l.id" cols="6">
          <LightCard @upd_model="updateModel" @upd_devs="retrieveDevices" :model="l"></LightCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { DeviceApi } from '@/api';
import LightCard from "@/components/devices/LightCard.vue";
export default {
  components: {
    LightCard,
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
      lights: [],
    }
  },
  methods: {
    retrieveDevices: async function() {
      try {      
        const ans = await DeviceApi.getDevicesByType('go46xmbqeomjrsjr');
        this.lights = ans.result
          .filter(d => {
            return !d.room || !d.room.home || d.room.home.id === this.home_id
          });
      }
      catch(err) {
        console.log(err);
      }
    },
    updateModel: function(newModel) {
      this.lights[this.lights.map((x, i) => [i, x]).filter(x => x[1].id == newModel.id)[0][0]] = newModel;  
    }
  },  
};
</script>
