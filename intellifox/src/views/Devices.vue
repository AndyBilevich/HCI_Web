<template>
  <div class="devices">
    <h1>Devices</h1>

    <v-row dense>
      <v-col cols="2" v-for="indDevice in devicesAvail" :key="indDevice.title">
          <CategoryCard :home_id="home_id" :categoryName="indDevice.title" :categoryIcon="indDevice.icon" :routeName="indDevice.routeName" />
      </v-col>
    </v-row>

    <router-link class="routerLink" to="/add_device">
      <v-btn class="add_btn" color="primary" fab big bottom right>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </router-link>

  </div>
</template>


<script>
  import { DeviceApi } from '@/api';
  import CategoryCard from "@/components/CategoryCard";
  export default {
    props: {
      home_id: String,
    },
    components: {
      CategoryCard
    },
    mounted: function() {
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
            routeName: 'AirConditioners'  
          }, 
          "mxztsyjzsrq7iaqc": {
            title: 'Alarms',
            icon: 'mdi-alarm-light-outline',
            routeName: 'Alarms'
          },
          "eu0v2xgprrhhg41g": {
            title: 'Blinds',
            icon: 'mdi-blinds',
            routeName: 'Blinds'
          },
          "lsf78ly0eqrjbz91": {
            title: 'Doors',
            icon: 'mdi-door',
            routeName: 'Doors'
          },
          "rnizejqr2di0okho": {
            title: 'Fridges',
            icon: 'mdi-fridge-outline',
            routeName: 'Fridges'
          },
          "go46xmbqeomjrsjr": {
            title: 'Lights',
            icon: 'mdi-lightbulb-on-outline',
            routeName: 'Lights'
          },
          "im77xxyulpegfmv8": {
            title: 'Ovens',
            icon: 'mdi-toaster-oven',
            routeName: 'Ovens'
          },
          "c89b94e8581855bc": {
            title: 'Speakers',
            icon: 'mdi-speaker',
            routeName: 'Speakers'
          },
          "dbrlsh7o5sn8ur4i": {
            title: 'Taps',
            icon: 'mdi-water-pump',
            routeName: 'Taps'
          },
          "ofglvd9gqx8yfl3l": {
            title: 'Vacuums',
            icon: 'mdi-robot-vacuum',
            routeName: 'Vacuums'
          } 
        }
      }
    },
    methods: {
      retrieveDeviceTypes: async function() {
        try {
          const ans = await DeviceApi.getAll();
          this.devicesAvail = ans.result
            .filter(dt => {
              return !dt.room || ( dt.room.home && dt.room.home.id === this.home_id )
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