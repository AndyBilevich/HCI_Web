<template>
  <div class="blinds">
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>Blinds</h1>
    </v-row>
    <v-container>
      <v-row dense>
        <v-col v-for="b in blinds" :key="b.id" cols="6">
          <WindowCard @upd_model="updateModel" @upd_devs="retrieveDevices" :model="b"></WindowCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { DeviceApi } from '@/api';
import WindowCard from "@/components/devices/WindowCard.vue";
export default {
  components: {
    WindowCard,
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
      blinds: [],
    }
  },
  methods: {
    retrieveDevices: async function() {
      try {      
        const ans2 = await DeviceApi.getDevicesByType('eu0v2xgprrhhg41g');
        this.blinds = ans2.result
          .filter(d => {
            return !d.room || !d.room.home || d.room.home.id === this.home_id 
          });
      }
      catch(err) {
        console.log(err);
      }
    },
    updateModel: function(newModel) {
      this.blinds[this.blinds.map((x, i) => [i, x]).filter(x => x[1].id == newModel.id)[0][0]] = newModel; 
    }
  },  
};
</script>

