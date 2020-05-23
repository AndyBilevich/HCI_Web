<template>
  <div class="speakers">
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>Speakers</h1>
    </v-row>
    <v-container>
      <v-row dense>
        <v-col v-for="s in speakers" :key="s.id" cols="6">
          <SpeakerCard @upd_model="updateModel" @upd_devs="retrieveDevices" :model="s"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { DeviceApi } from '@/api';
import SpeakerCard from "@/components/devices/SpeakerCard.vue";
export default {
  components: {
    SpeakerCard,
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
      speakers: [],
    }
  },
  methods: {
    retrieveDevices: async function() {
      try {      
        const ans2 = await DeviceApi.getDevicesByType('c89b94e8581855bc');
        this.speakers = ans2.result
          .filter(d => {
            return !d.room || d.room.home || d.room.home.id === this.home_id
          });
      }
      catch(err) {
        console.log(err);
      }
    },
    updateModel: function(newModel) {
      this.speakers[this.speakers.map((x, i) => [i, x]).filter(x => x[1].id == newModel.id)[0][0]] = newModel;  
    }
  },  
};
</script>
