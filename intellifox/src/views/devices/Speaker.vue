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
    <v-btn @click="addDevice" class="add_btn" color="primary" fab big bottom right>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import storage from '@/storage';
import router from '@/router';
import { DeviceApi } from '@/api';
import SpeakerCard from "@/components/devices/SpeakerCard.vue";
export default {
  components: {
    SpeakerCard,
  },
  created: async function() {
    const home = await storage.getActualHome();
    this.home_id = home?home.id:'';
    this.typeId = await storage.getTypeId("Speaker");    
    this.retrieveDevices();
  },
  data: function() {
    return {
      typeId: '',
      home_id: '',
      speakers: [],
    }
  },
  methods: {
    addDevice: async function() {
      router.push({path:'/devices/add', query:{deviceTypeId: this.typeId}});
    },
    retrieveDevices: async function() {
      try {      
        const ans2 = await DeviceApi.getDevicesByType(this.typeId);
        this.speakers = ans2.result
          .filter(d => {
            return !d.room || !d.room.home || d.room.home.id === this.home_id
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
