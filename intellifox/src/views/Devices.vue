<template>
  <div class="devices">
    <h1>Devices</h1>

    <v-row dense>
      <v-col cols="2" v-for="indDevice in deviceList" :key="indDevice.title">
          <CategoryCard :categoryName="indDevice.title" :categoryIcon="indDevice.icon" :whereTo="indDevice.link" />
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
            link: '/devices/air-conditioners'  
          }, 
          "mxztsyjzsrq7iaqc": {
            title: 'Alarms',
            icon: 'mdi-alarm-light-outline',
            link: '/devices/alarms'
          },
          "eu0v2xgprrhhg41g": {
            title: 'Blinds',
            icon: 'mdi-blinds',
            link: '/devices/blinds'
          },
          "lsf78ly0eqrjbz91": {
            title: 'Doors',
            icon: 'mdi-door',
            link: '/devices/doors'
          },
          "rnizejqr2di0okho": {
            title: 'Fridges',
            icon: 'mdi-fridge-outline',
            link: '/devices/fridges'
          },
          "go46xmbqeomjrsjr": {
            title: 'Lights',
            icon: 'mdi-lightbulb-on-outline',
            link: '/devices/lights'
          },
          "im77xxyulpegfmv8": {
            title: 'Ovens',
            icon: 'mdi-toaster-oven',
            link: '/devices/ovens'
          },
          "c89b94e8581855bc": {
            title: 'Speakers',
            icon: 'mdi-speaker',
            link: '/devices/speakers'
          },
          "dbrlsh7o5sn8ur4i": {
            title: 'Taps',
            icon: 'mdi-water-pump',
            link: '/devices/taps'
          },
          "ofglvd9gqx8yfl3l": {
            title: 'Vacuums',
            icon: 'mdi-robot-vacuum',
            link: '/devices/vacuums'
          } 
        }
      }
    },
    methods: {
      retrieveDeviceTypes: async function() {
        try {
          const ans = await DeviceApi.getAll();
          if (ans) {
            let deviceTypes = [...ans.result];
            //console.log(deviceTypes);
            /*
            deviceTypes
              .filter(dt => {
                return dt.room && dt.room.home && dt.room.home.id === this.home_id
              })
              .map(dt => dt.type.id)
              .reduce((unique, dt) => unique.includes(dt) ? unique: [...unique, dt],[]);
            */
            deviceTypes.forEach((dt, index, object) => {
              if(!(dt.room && dt.room.home && dt.room.home.id === this.home_id))
                object.splice(dt, 1);
            })
            console.log(deviceTypes);
          } 
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