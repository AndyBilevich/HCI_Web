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
          <VacuumCard @upd_model="updateModel" :model="v"></VacuumCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { DeviceApi } from '@/api';
import VacuumCard from "@/components/devices/VacuumCard.vue";
export default {
  components: {
    VacuumCard,
  },
  mounted: function() {
    const query = this.$route.query;
    if (query)
      this.home_id = query.home_id
    this.retrieveDevices();    
  },
  data: function() {
    return {
      home_id: '',
      vacuums: [],
    }
  },
  methods: {
    retrieveDevices: async function() {
      try {      
        const ans2 = await DeviceApi.getDevicesByType('ofglvd9gqx8yfl3l');
        this.vacuums = ans2.result
          .filter(d => {
            return !d.room || d.room.home || d.room.home.id === this.home_id
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
