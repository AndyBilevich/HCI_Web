<template>
  <div class="devices">
    <h1 align="center">Devices</h1>
    <div v-if="devicesAvail.length === 0">
      <v-row class="d-flex justify-center">
        <h3 class="noItemsMessage" align="center"> {{noItemsText}} </h3>
      </v-row>
    </div>
    <div v-else>
      <v-row dense>
        <v-col cols="2" v-for="d in devicesAvail" :key="d.title">
          <CategoryCard :categoryName="`${d.title + 's'}`" :categoryIcon="d.icon" routeName="Device" :devName="d.name" />
        </v-col>
      </v-row>
    </div>
    
    <v-btn @click="addDevice" class="add_btn" color="primary" fab big bottom right>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>


<script>
  import storage from '@/storage';
  import router from '@/router';
  import { DeviceApi } from '@/api';
  import CategoryCard from "@/components/CategoryCard";
  export default {
    components: {
      CategoryCard
    },
    created: async function() {
      const home = await storage.getActualHome();
      this.home_id = home?home.id:'';
      const devTypes = await storage.getAllTypes();
      this.deviceInfo = devTypes;
      //console.log(devTypes);
      await this.retrieveDeviceTypes();
    },
    data: function() {
      return {
        noItemsText: "",
        hidden: false,
        devicesAvail: [],
        deviceInfo: {},
        home_id: '',
      }
    },
    methods: {
      addDevice: async function() {
        router.push({name: "AddDevice"});
      },
      retrieveDeviceTypes: async function() {
        try {
          const ans = await DeviceApi.getAll();
          this.devicesAvail = ans.result
            .filter(dt => {
              return !dt.room || !dt.room.home || dt.room.home.id === this.home_id
            })
            .map(dt => dt.type.name)
            .reduce((unique, name) => unique.includes(name) ? unique: [...unique, name],[])
            .map(name => this.deviceInfo[name]);
          //console.log(this.devicesAvail);
          this.noItemsText = "You don't have devices yet. Add one with the bottom right button.";
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