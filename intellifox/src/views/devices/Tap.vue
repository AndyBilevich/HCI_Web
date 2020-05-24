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
          <WaterCard @upd_model="updateModel" @upd_devs="retrieveDevices" :model="t"></WaterCard>
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
import WaterCard from "@/components/devices/WaterCard.vue";
export default {
  components: {
   WaterCard,
  },
  created: async function() {
    const home = await storage.getActualHome();
    this.home_id = home?home.id:'';
    this.typeId = await storage.getTypeId("Tap");      
    this.retrieveDevices();    
  },
  data: function() {
    return {
      type_id: '',
      home_id: '',
      taps: [],
    }
  },
  methods: {
    addDevice: async function() {
      router.push({path:'/devices/add', query:{deviceTypeId: this.typeId}});
    },
    retrieveDevices: async function() {
      try {      
        const ans2 = await DeviceApi.getDevicesByType(this.typeId);
        /*
        ans2.result.forEach(t => {
          if (t.room && t.room.home)
            console.log(JSON.stringify(t.room.home.id));
        });
        */
        this.taps = ans2.result
          .filter(t => {
            return !t.room || !t.room.home || t.room.home.id === this.home_id;
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
