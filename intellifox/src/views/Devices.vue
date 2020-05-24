<template>
  <div class="devices">
    <h1>Devices</h1>

    <v-row dense>
      <v-col cols="2" v-for="indDevice in devicesAvail" :key="indDevice.title">
          <CategoryCard :categoryName="indDevice.title" :categoryIcon="indDevice.icon" :routePath="indDevice.routePath" />
      </v-col>
    </v-row>

    <router-link class="routerLink" to="/devices/add">
      <v-btn class="add_btn" color="primary" fab big bottom right>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </router-link>

  </div>
</template>


<script>
  import storage from '@/storage';
  import { DeviceApi } from '@/api';
  import CategoryCard from "@/components/CategoryCard";
  export default {
    components: {
      CategoryCard
    },
    created: async function() {
      const home = await storage.getActualHome();
      this.home_id = home?home.id:'';
      this.retrieveDeviceTypes();
    },
    data: function() {
      return {
        hidden: false,
        devicesAvail: [],
        deviceInfo: {
          "li6cbv5sdlatti0j": {
            title: 'Air Conditioners',
            icon: 'mdi-air-conditioner',
            routePath: '/devices/air-conditioners'  
          }, 
          "mxztsyjzsrq7iaqc": {
            title: 'Alarms',
            icon: 'mdi-alarm-light-outline',
            routePath: '/devices/alarms'
          },
          "eu0v2xgprrhhg41g": {
            title: 'Blinds',
            icon: 'mdi-blinds',
            routePath: '/devices/blinds'
          },
          "lsf78ly0eqrjbz91": {
            title: 'Doors',
            icon: 'mdi-door',
            routePath: '/devices/doors'
          },
          "rnizejqr2di0okho": {
            title: 'Fridges',
            icon: 'mdi-fridge-outline',
            routePath: '/devices/fridges'
          },
          "go46xmbqeomjrsjr": {
            title: 'Lights',
            icon: 'mdi-lightbulb-on-outline',
            routePath: '/devices/lights'
          },
          "im77xxyulpegfmv8": {
            title: 'Ovens',
            icon: 'mdi-toaster-oven',
            routePath: '/devices/ovens'
          },
          "c89b94e8581855bc": {
            title: 'Speakers',
            icon: 'mdi-speaker',
            routePath: '/devices/speakers'
          },
          "dbrlsh7o5sn8ur4i": {
            title: 'Taps',
            icon: 'mdi-water-pump',
            routePath: '/devices/taps'
          },
          "ofglvd9gqx8yfl3l": {
            title: 'Vacuums',
            icon: 'mdi-robot-vacuum',
            routePath: '/devices/vacuums'
          } 
        },
        home_id: '',
      }
    },
    methods: {
      retrieveDeviceTypes: async function() {
        try {
          const ans = await DeviceApi.getAll();
          this.devicesAvail = ans.result
            .filter(dt => {
              return !dt.room || !dt.room.home || dt.room.home.id === this.home_id
            })
            .map(dt => dt.type.id)
            .reduce((unique, id) => unique.includes(id) ? unique: [...unique, id],[])
            .map(id => this.deviceInfo[id]);
        }
        catch(err) {
          console.log(err);
        }
      }
    }
  };
</script>

<style>

.add_btn {
  position: absolute;
  bottom: 7%;
  left: 88%;
  float: right;
}

</style>