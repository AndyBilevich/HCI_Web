<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard 
        @set_switch_state="switchOnOff"
        @upd_devs="emitUpdDevs"
        :model="light"
        :switchState="switchState"
        :switchLoads="switchLoading"
        :switchLocked="switchLocked"
        :click="() => {show = !show}" 
        :title="title"
        :show="show" 
        :subtitle="desc"
        icon="mdi-lightbulb-outline"
        :iconColor="fullColor">
      </TopCard>
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            
              <h3 class="ml-5 mt-4" align="left">Choose color and brightness:</h3>
              <v-row>
                <v-col cols="2"></v-col>
                <v-col v-on:click="() => { colorAction(); }" cols="8">
                  <v-color-picker v-model="fullColor" class="ma-5 background1"  :mode.sync="mode"></v-color-picker>
                </v-col>
                              </v-row>         
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
  
  mounted: function(){
    if(this.light.state.status === 'off')
      this.switchLocked = false;
    this.updateTitle();
    this.updateDesc();
    this.updateState();
    this.updateColor();
    this.updateBrightness();
    this.subscribeToEvents();
  },

  data: function() {
    return {
      source:undefined,

      show:false,
      lightOn: false,
      switchState:false,
      switchLoading:false,
      switchLocked:false,
      locked:true,
      title: '',
      desc: '',
      mode: "hexa",
      color:  "#FFAAAA",
      brightness: "FF",
      
    }
  },
  computed: {
    fullColor: {
      get: function() {
        return this.color + this.brightness;
      },
      set: function(newFullColor) {
        this.color = newFullColor.substr(0, 7);
                
        this.brightness = newFullColor.substr(7);
      }
    },

    light: {
      get: function() {
        return this.model;
      },
      set: function(newModel) {
        this.$emit('upd_model', newModel);
      }
    }
  },
  
  methods:{
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
        this.source = new EventSource(`${DeviceApi.url}/${this.light.id}/events`);
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
          this.light.state.status = data.args.newStatus;
          break;
        case 'colorChanged':
          this.light.state.color = data.args.newColor;
          break;
        case 'brightnessChanged':
          this.light.state.brightness = data.args.newBrightness;
          break;  
        default:
          return;
      }

      this.updateTitle();
      this.updateDesc();
      this.updateState();
      this.updateColor();
      this.updateBrightness();
    },
    updateTitle: function() {
      this.title = this.light.name;
    },
    updateDesc: function() {
      this.desc = `${(this.light.state.status === 'on')? 'ON': 'OFF' }`;
    },
    updateState: function() {
      this.switchState = (this.light.state.status === 'on')?true:false;
    },
    updateColor: function() {
      this.color = this.light.state.color;
      
    },
    updateBrightness: function(){
      var resp = this.light.state.brightness.toString(16);
      if(this.light.state.brightness <= 16)
        resp = "0" + resp;
      this.brightness = resp;
    },

    colorAction: async function(){
      await DeviceApi.setAction(this.light.id, 'setColor', [this.fullColor.substr(1,6)]);
      await DeviceApi.setAction(this.light.id, 'setBrightness', [ parseInt(this.fullColor.substr(7,8),16) ]);
    },
  
    switchOnOff: async function(new_switch_state) {
      this.switchState = new_switch_state;
      this.switchLoading = true;
      this.switchLocked = true;
      await this.switchActions();
      this.switchLocked = false;
      this.switchLoading = false;
    },

    switchActions: async function() {
      try {
        let ans;
        if (this.switchState)
          ans = await DeviceApi.setAction(this.light.id, 'turnOn');
        else
          ans = await DeviceApi.setAction(this.light.id, 'turnOff');
        if (ans.result) {
          const ans = await DeviceApi.getState(this.light.id);
          this.light.state = ans.result;
          this.updateTitle();
          this.updateDesc();
          this.updateState();
        
        } 
      } catch (err) {
        console.log(err);
      }
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
