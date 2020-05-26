<template>
  <div class="history">
    <v-row>
      <v-col  cols="6"><h1 class="title text-left">History</h1></v-col>
      <v-col class = "d-flex align-center" cols="2">
        <v-row>
          <v-text-field
            label="Search"
            v-model="search"
          ></v-text-field>
        </v-row>
      </v-col>
      <v-col cols="1"></v-col>
      
      <v-col class = "d-flex align-center" cols="2">
        <v-dialog v-model="dialog" scrollable max-width="600px" >
            <template v-slot:activator="{ on }">
                <v-btn color="primary" x-large v-on="on">
                    <v-icon>mdi-plus</v-icon>
                    Select Device
                </v-btn>
            </template>
            <v-card color="background3">
                <v-card-title>
                  <span class="headline">Select device:</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-card  class="box" color="background2" width="100%">
                            <v-list-item-group v-model="selected" color="primary">
                                <v-list-item
                                    @click="() => {
                                      selectedDeviceId = device.id;
                                      setShowingLogs();  
                                    }"
                                    v-for="device in devices" 
                                    :key="device.id"
                                >
                                    <v-list-item-icon>
                                        <v-icon>{{device.icon}}</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <h1>{{device.name}}</h1>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-card>
                    </v-row>
                </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
      </v-col>      
    </v-row>
    <v-row class="d-flex justify-center">
      <v-data-table
        width="700px"
        height="300px"
        :headers="headers"
        :items="showingLogs"
        :items-per-page="5"
        :loading="!logsLoaded"
        :search="search"
        multi-sort
        sort-by="date"
        :sort-desc="sortDesc"
        class="elevation-1"
      >
      </v-data-table>
    </v-row>
  </div>
</template>

<script>
  import storage from '@/storage';
  import { DeviceApi } from '@/api';
  export default {
    beforeMount: async function() {
      await this.retrieveLogs();
      await this.retrieveDevices();
    },
    data: function() {
      return {

        headers: [
          {
            text: 'Device',
            align: 'start',
            value: 'type',
          },
          {
            text: 'Name',
            value: 'name',
          },
          {
            text: 'Action',
            value: 'action',
          },
          {
            text: 'Params',
            value: 'params',
          },
          {
            text: 'Result',
            value: 'result',
          },
          {
            text: 'Date',
            value: 'date',
          },
        ],
        search: '',
        logs: [],
        showingLogs: [],
        logsLoaded: false,
        sortDesc: true,

        type: 'hex',
        hex: '#FF00FF',
        dialog: false,
        dialogm1: '',
        devices: [],
        selected: -1,
        selectedDeviceId: '',
        addedDevList: [
          {
            name: 'Air Conditioners',
            icon: 'mdi-air-conditioner',
            link: '/devices/air-conditioners'
          },
        ]
      }
    },
    methods: {
      retrieveLogs: async function() {
        const ans = await DeviceApi.getAllLogs(1000, 0);
        const types = await storage.getAllTypes();
        this.logs = [];
        let typeName, dev;
        for(let i = 0; i < ans.result.length; i++) {
          dev = await DeviceApi.get(ans.result[i].deviceId);
          typeName = await storage.getTypeTitle(dev.result.type.name);
          this.logs.push({
            icon: types[dev.result.type.name].icon,
            type: typeName,
            deviceId: ans.result[i].deviceId,
            name: dev.result.name,
            action: ans.result[i].action,
            params: ans.result[i].params,
            result: ans.result[i].result,
            date: ans.result[i].timestamp,
          });
        }
        this.setShowingLogs();
        this.logsLoaded = true;
      },
      setShowingLogs() {
        this.showingLogs = this.logs.filter(l => (this.selectedDeviceId == '' || l.deviceId == this.selectedDeviceId));
      },
      retrieveDevices: async function(){
        const ans = await DeviceApi.getAll();
        this.devices = ans.result;
      },
    }
  }
</script>


<style scoped>
  .homes {
    padding: 10,
  }
  .card {
    margin: 20;
    cursor: pointer;
  }
  .title {
    margin-left: 35px;
  }
</style>