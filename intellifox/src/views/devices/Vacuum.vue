<template>
  <div class="vacuums">
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>Vacuums</h1>
    </v-row>
    <v-container>
      <v-row dense>
        <v-col v-for="v in vacuums" :key="v.id" cols="6">
          <VacuumCard @upd_model="updateModel" @upd_devs="retrieveDevices" :model="v"></VacuumCard>
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
import VacuumCard from "@/components/devices/VacuumCard.vue";
export default {
  components: {
    VacuumCard,
  },
  created: async function() {
    const home = await storage.getActualHome();
    this.home_id = home?home.id:'';
    this.retrieveDevices();    
  },
  data: function() {
    return {
      home_id: '',
      vacuums: [],
    }
  },
  methods: {
    addDevice: async function() {
      router.push({path:'/devices/add', query:{deviceTypeId: 'ofglvd9gqx8yfl3l'}});
    },
    retrieveDevices: async function() {
      console.log("borrando");
      try {
        const ans2 = await DeviceApi.getDevicesByType('ofglvd9gqx8yfl3l');
        this.vacuums = [];
        this.vacuums = ans2.result
          .filter(d => {
            return !d.room || !d.room.home || d.room.home.id === this.home_id
          });
      }
      catch(err) {
        console.log(err);
      }
    },
    updateModel: function(newModel) {
      this.vacuums[this.vacuums.map((x, i) => [i, x]).filter(x => x[1].id == newModel.id)[0][0]] = newModel; 
    }
  },
};
</script>
