<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard
        @set_switch_state="switchOnOff"
        @upd_devs="emitUpdDevs"
        :model="ac"
        :switchState="switchState"
        :switchLoads="switchLoading"
        :switchLocked="switchLocked"
        :click="() => {show = !show}" 
        :show="show" 
        :title="title" 
        :subtitle="desc" 
        icon="mdi-air-conditioner">
      </TopCard>
    </div>
    <div class="device_bottom_card" max-width="10">
        <v-expand-transition >
          <div v-show="show">
            <v-divider></v-divider>
              <v-col>
                <v-row>
                  <v-col cols="2"></v-col>
                  <h3 class="mt-3">Temperature:</h3>
                  <v-col cols="1"></v-col>
                      <v-btn icon x-large @click="() => { updateTemp(-1); }">
                        <v-icon x-large>mdi-chevron-down</v-icon>
                      </v-btn>
                      <h1>{{temperature}}°</h1>
                      <v-btn icon x-large @click="() => { updateTemp(+1); }">
                        <v-icon x-large>mdi-chevron-up</v-icon>
                      </v-btn>
                </v-row>

                <v-col> 
                  <h3 align="left" class="mt-5">Mode:</h3>
                  <v-btn-toggle
                    v-model="mode"
                    mandatory
                    tile
                    @change="() => { updateMode(); }"
                  >
                    <v-btn v-for="m in modes" :key="m.id" width="160">
                      <v-icon>{{m.icon}}</v-icon>
                      {{m.text}}
                    </v-btn>
                  </v-btn-toggle>
                </v-col>

                <v-col> 
                  <h3 align="left" class="mt-5">Vertical blades rotation:</h3>
                  <v-btn-toggle
                    v-model="vertical"
                    mandatory
                    tile
                    @change="() => { updateVSwing(); }"
                  >
                    <v-btn v-for="vs in vSwing" :key="vs.id" width="70">
                        {{vs}}
                    </v-btn>
                  </v-btn-toggle>
                </v-col>

                <v-col> 
                  <h3 align="left" class="mt-5">Horizontal blades rotation:</h3>
                  <v-btn-toggle
                    v-model="horizontal"
                    mandatory
                    tile
                    @change="() => { updateHSwing(); }"
                  >
                    <v-btn v-for="hs in hSwing" :key="hs.id" width="70">
                      {{hs}}
                    </v-btn>
                  </v-btn-toggle>
                </v-col>

                <v-col> 
                  <h3 align="left" class="mt-5">Fan speed:</h3>
                  <v-btn-toggle
                    v-model="speed"
                    mandatory
                    tile
                    @change="() => { updateSpeed(); }"
                  >
                    <v-btn v-for="fs in fanSpeeds" :key="fs.id" width="70">
                      {{fs}}
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
    ac: {
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
      fanSpeeds: [ "auto", "25", "50", "75", "100" ],
      hSwing: [ "auto", "-90", "-45", "0", "45", "90"],
      vSwing: [ "auto", "22", "45", "67", "90"],
      modesAux: [ "cool", "heat", "fan" ],
      modes: [
        {
          text: "cool",
          icon: "mdi-snowflake",
        }, {
          text: "heat",
          icon: "mdi-weather-sunny",
        }, {
          text: "fan",
          icon: "mdi-fan",
        }
      ],
      title: '',
      desc: '',

      temperature:18,
      mode: 0,
      vertical: 0,
      horizontal: 0,
      speed: 0,

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
        this.source = new EventSource(`${DeviceApi.url}/${this.ac.id}/events`);
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
          this.ac.state.status = data.args.newStatus;
          break;
        case 'temperatureChanged':
          this.ac.state.temperature = parseInt(data.args.newTemperature);
          break;
        case 'modeChanged':
          this.ac.state.mode = data.args.newMode;
          break;
        case 'verticalSwingChanged':
          this.ac.state.verticalSwing = data.args.newSwing;
          break;
        case 'horizontalSwingChanged':
          this.ac.state.horizontalSwing = data.args.newSwing;
          break;
        case 'fanSpeedChanged':
          this.ac.state.fanSpeed = data.args.newSpeed;
          break;
        default:
          return;
      }
      this.updateDesc();
      this.updateState();
    },
    updateTitle: function() {
      this.title = this.ac.name;
    },
    updateDesc: function() {
      let status = this.ac.state.status;
      let temperature = this.ac.state.temperature;
      let mode = this.ac.state.mode;
      let vert = this.ac.state.verticalSwing;
      let hor = this.ac.state.horizontalSwing;
      let speed = this.ac.state.fanSpeed;
      this.desc = `Status: ${status} - Temp: ${temperature} - Mode: ${mode} - vSwing: ${vert} - hSwing: ${hor} - Speed: ${speed}`;
      this.temperature = this.ac.state.temperature;
      this.mode = this.modesAux.findIndex(e => e == this.ac.state.mode);
      this.vertical = this.vSwing.findIndex(e => e == this.ac.state.verticalSwing);
      this.horizontal = this.hSwing.findIndex(e => e == this.ac.state.horizontalSwing);
      this.speed = this.fanSpeeds.findIndex(e => e == this.ac.state.fanSpeed);
    },
    updateState: function() {
      this.switchState = (this.ac.state.status === 'on')?true:false;
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
          ans = await DeviceApi.setAction(this.ac.id, 'turnOn');
        }catch(err){
          console.log(err);
        }

       
      }else{
        try{
          ans = await DeviceApi.setAction(this.ac.id, 'turnOff');
       
        }catch(err){
          console.log(err);
        }
      }
      if (ans.result) {
        this.updateInfo();
      }
    },

    updateTemp: async function(i){

      if( (i > 0 && this.temperature == 38) || ( i < 0 && this.temperature == 18 ) ){
        return;
      }

      let temp = this.ac.state.temperature;
      try{
        await DeviceApi.setAction(this.ac.id, 'setTemperature', [ temp + i ]);
      }catch(err){
        console.log(err);
      }
      this.updateInfo();
      
    },
    updateMode: async function(){
      try{
        await DeviceApi.setAction(this.ac.id, 'setMode', [ this.modes[this.mode].text ]);
      }catch(err){
        console.log(err);
      }
      this.updateInfo();
    },
    updateVSwing: async function(){
      try{
        await DeviceApi.setAction(this.ac.id, 'setVerticalSwing', [ this.vSwing[this.vertical] ]);
      }catch(err){
        console.log(err);
      }
      this.updateInfo();
    },
    updateHSwing: async function(){
      try{
        await DeviceApi.setAction(this.ac.id, 'setHorizontalSwing', [ this.hSwing[this.horizontal] ]);
      }catch(err){
        console.log(err);
      }
      this.updateInfo();
    },
    updateSpeed: async function(){
      try{
        await DeviceApi.setAction(this.ac.id, 'setFanSpeed', [  this.fanSpeeds[this.speed] ] );
      }catch(err){
        console.log(err);
      }
      this.updateInfo();
    },
    updateInfo: async function(){
      try{
        const ans = await DeviceApi.getState(this.ac.id);
        this.ac.state = ans.result;
      }catch (err){
        console.log(err);
      }
      this.updateTitle();
      this.updateDesc();
      this.updateState();
    },
    emitUpdDevs: async function(){
      this.$emit('upd_devs');
    }
  },
  beforeDestroy: function() {
    this.unsubscribeToEvents();
  }
};
</script>