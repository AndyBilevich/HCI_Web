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
          <AirConditionerCard @upd_model="updateModel" @upd_devs="retrieveDevices" :model="a"></AirConditionerCard>
        </v-col>
      </v-row>
    </v-container>
    <v-btn @click="addDevice" class="add_btn" color="primary" fab big bottom right>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>


<script>
import storage from '@/storage';
import router from '@/router';
import { DeviceApi } from '@/api';
import AirConditionerCard from "@/components/devices/AirConditionerCard.vue";
export default {
  components: {
    AirConditionerCard,
  },
  created: async function() {
    const home = await storage.getActualHome();
    this.home_id = home?home.id:'';
    this.retrieveDevices();    
  },
  data: function() {
    return {
      home_id: '',
      acs: [],
    }
  },
  methods: {
    addDevice: async function() {
      router.push({path:'/devices/add', query:{deviceTypeId: 'li6cbv5sdlatti0j'}});
    },
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
      this.acs[this.acs.map((x, i) => [i, x]).filter(x => x[1].id == newModel.id)[0][0]] = newModel; 
    }
  },  
};
</script>
