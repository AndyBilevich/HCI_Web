<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard
        @set_switch_state="switchOnOff"
        @upd_devs="emitUpdDevs"
        :model="oven"
        :switchState="switchState"
        :switchLoads="switchLoading"
        :switchLocked="switchLocked"
        :click="() => {show = !show}" 
        :show="show" 
        :title="title" 
        :subtitle="desc" 
        icon="mdi-toaster-oven">
      </TopCard>
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-col>   
              <v-row>
                <v-col cols="2"></v-col>
                <h3 class="mt-3">Temperature:</h3>
                <v-col cols="1"></v-col>
                <v-btn icon x-large @click="() => { updateTemp(-10); }">
                  <v-icon x-large>mdi-chevron-down</v-icon>
                </v-btn>
                <h1>{{temperature}}°</h1>
                <v-btn icon x-large @click="() => { updateTemp(+10); }">
                  <v-icon x-large>mdi-chevron-up</v-icon>
                </v-btn>
              </v-row>

              <v-col> 
                <h3 align="left" class="mx-5 mt-5">Heat source:</h3>
                <v-btn-toggle
                  v-model="heat"
                  mandatory
                  tile
                  class="mt-5"
                  @change="() => { updateHeatSrc(); }"
                >
                  <v-btn v-for="h in heatSrc" :key="h.id" width="160">
                      {{h}}
                    </v-btn>
                </v-btn-toggle>
              </v-col>

              <v-col> 
                <h3 align="left" class="mx-5 mt-5">Grill mode:</h3>
                <v-btn-toggle
                  v-model="grill"
                  mandatory
                  tile
                  class="mt-5"
                  @change="() => { updateGrill(); }"
                >
                  <v-btn v-for="g in grillMode" :key="g.id" width="160">
                      {{g}}
                  </v-btn>
                </v-btn-toggle>
              </v-col>

              <v-col> 
                <h3 align="left" class="mx-5 mt-5">Convection mode:</h3>
                <v-btn-toggle
                  v-model="convection"
                  mandatory
                  tile
                  class="mt-5"
                  @change="() => { updateConvection(); }"
                >
                  <v-btn v-for="c in convectionMode" :key="c.id" width="160">
                    {{c}}
                  </v-btn>
                </v-btn-toggle>
              </v-col>

            </v-col>
          </div>
        </v-expand-transition>
    </div>
  </v-card>
</template>

<script>
import { DeviceApi } from '@/api';
import TopCard from "@/components/devices/GenericTopCard.vue";
export default {
  components: {
    TopCard,
  },
  props: {
    model: Object,
  },
  
  computed: {
    oven: {
      get: function() {
        return this.model;
      },
      set: function(newModel) {
        this.$emit('upd_model', newModel);
      }
    }
  },
  mounted: function() {
    this.updateInfo();
    this.subscribeToEvents();
  },
  data: function() {
    return {
      source:undefined,

      show:false,
      switchState:false,
      switchLoading:false,
      switchLocked:false,
      title: '',
      desc: '',

      heatSrc: [ "conventional", "bottom", "top"],
      grillMode: [ "large", "eco", "off"],
      convectionMode: [ "normal", "eco", "off"],

      temperature:90,
  
      heat: 0,
      grill: 0,
      convection: 0,
    }
  },

  methods: {
    subscribeCallback: async function(event) {
          const data = await JSON.parse(event.data);
          this.updateDevice(data);
    },
    subscribeToEvents: function() {
      if (!this.source) {
        if (!EventSource) {
          alert('Sorry, your browser does not support server-sent events.');
          return;
        }
        this.source = new EventSource(`${DeviceApi.url}/${this.oven.id}/events`);
        this.source.addEventListener('message', this.subscribeCallback, false);
      }
    },
    unsubscribeToEvents: function() {
      if (this.source) {
        this.source.removeEventListener('message', this.subscribeCallback);
        this.source.close();
        this.source = undefined;
      }
    },
    startUpdating: function() {
        this.subscribeToEvents();
    },
    stopUpdating: function() {
      this.unsubscribeToEvents();
    },
    updateDevice: function(data) {
      switch(data.event) {
        case 'statusChanged':
          this.oven.state.status = data.args.newStatus;
          break;
        case 'temperatureChanged':
          this.oven.state.temperature = parseInt(data.args.newTemperature);
          break;
        case 'heatChanged':
          this.oven.state.heat = data.args.newHeat;
          break;
        case 'grillChanged':
          this.oven.state.grill = data.args.newGrill;
          break;
        case 'convectionChanged':
          this.oven.state.convection = data.args.newConvection;
          break;
      }
      this.updateDesc();
      this.updateState();
    },
    updateTitle: function() {
      this.title = this.oven.name;
    },
    updateDesc: function() {
      let status = this.oven.state.status;
      let temperature = this.oven.state.temperature;
      let heat = this.oven.state.heat;
      let grill = this.oven.state.grill;
      let convection = this.oven.state.convection;
      this.desc = `Status: ${status} - Temp: ${temperature} - heat: ${heat} - grill: ${grill} - convection: ${convection}`;
      this.temperature = this.oven.state.temperature;
      this.heat = this.heatSrc.findIndex(e => e == this.oven.state.heat);
      this.grill = this.grillMode.findIndex(e => e == this.oven.state.grill);
      this.convection = this.convectionMode.findIndex(e => e == this.oven.state.convection);
    },
    updateState: function() {
      this.switchState = (this.oven.state.status === 'on')?true:false;
    },
    updateInfo: async function(){
      try{
        const ans = await DeviceApi.getState(this.oven.id);
        this.oven.state = ans.result;
      }catch (err){
        console.log(err);
      }
      this.updateTitle();
      this.updateDesc();
      this.updateState();
    },

    switchOnOff: async function(new_switch_state) {
      this.switchState = new_switch_state;
      this.switchLoading = true;
      this.switchLocked = true;
      try{
        await this.switchActions();
      }catch(err){
        console.log(err);
      }
      this.switchLocked = false;
      this.switchLoading = false;
    },
    switchActions: async function() {
      let ans;
      if (this.switchState){
        try{
          ans = await DeviceApi.setAction(this.oven.id, 'turnOn');
        }catch(err){
          console.log(err);
        }
      }else{
        try{
          ans = await DeviceApi.setAction(this.oven.id, 'turnOff');
       
        }catch(err){
          console.log(err);
        }
      }
      if (ans.result) {
        this.updateInfo();
      }
    },

    updateTemp: async function(i){ //lista

      if( (i > 0 && this.temperature == 230) || ( i < 0 && this.temperature == 90 ) ){
        return;
      }

      let temp = this.oven.state.temperature;
      try{
        await DeviceApi.setAction(this.oven.id, 'setTemperature', [ temp + i ]);
      }catch(err){
        console.log(err);
      }
      this.updateInfo();
    },
    updateHeatSrc: async function(){
      try{
        await DeviceApi.setAction(this.oven.id, 'setHeat', [ this.heatSrc[this.heat] ]);
      }catch(err){
        console.log(err);
      }
      this.updateInfo();
    },
    updateGrill: async function(){
      try{
        await DeviceApi.setAction(this.oven.id, 'setGrill', [ this.grillMode[this.grill] ]);
      }catch(err){
        console.log(err);
      }
      this.updateInfo();
    },
    updateConvection: async function(){
      try{
        await DeviceApi.setAction(this.oven.id, 'setConvection', [ this.convectionMode[this.convection] ]);
      }catch(err){
        console.log(err);
      }
      this.updateInfo();
    },
    emitUpdDevs: async function(){
      this.$emit('upd_devs');
    }
  },
  beforeDestroy: function() {
    this.unsubscribeToEvents();
  },
};
</script>