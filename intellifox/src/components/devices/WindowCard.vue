<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard 
        icon="mdi-blinds"
        @set_switch_state="switchOnOff"
        :model="blinds"
        :switchState="switchState"
        :switchLoads="switchLoading"
        :switchLocked="switchLocked"
        :click="() => {show = !show}" 
        :show="show" 
        :title="title" 
        :subtitle="desc" 
      ></TopCard>
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
              <v-row>
                <v-col cols="2"></v-col>
                  <h3 class="mt-3">Level:</h3>
                  <v-col cols="1"></v-col>
                  <v-btn icon x-large @click="() => { updateLevel(-5); }">
                    <v-icon x-large>mdi-chevron-down</v-icon>
                  </v-btn>
                  <h1>{{ this.blinds.state.level}}</h1>
                  <v-btn icon x-large @click="() => { updateLevel(+5); }">
                    <v-icon x-large>mdi-chevron-up</v-icon>
                  </v-btn>
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
  props: {
    model: Object,
  },
  components: {
    TopCard,
  },
  computed: {
    blinds: {
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
    this.startUpdating();
  },
  data: function() {
    return {
      level:100,

      show:false,
      switchState:false,
      switchLoading:false,
      switchLocked:false,
      title: '',
      desc: '',
    }
  },
  
  methods: {
    subscribeCallback: async function(event) {
          console.log("Received event");
          const data = await JSON.parse(event.data);
          this.updateDevice(data);
    },
    subscribeToEvents: function() {
      if (!this.source) {
        if (!EventSource) {
          alert('Sorry, your browser does not support server-sent events.');
          return;
        }
        this.source = new EventSource(`${DeviceApi.url}/${this.blinds.id}/events`);
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
          this.blinds.state.status = data.args.newStatus;
          break;
        case 'levelChanged':
          this.blinds.state.level = parseInt(data.args.newLevel);
          break;
        default:
          return;
      }
      this.updateDesc();
      this.updateState();
    },
    updateTitle: function() {
      this.title = this.blinds.name;
    },
    updateDesc: function() {
      this.desc = `${(this.blinds.state.status === 'closed')? 'Closed':`Open`} - level: ${this.blinds.state.level} - Current Level: ${this.blinds.state.currentLevel}`;
    },
    updateState: function() {
      this.switchState = (this.blinds.state.status === 'opened')?true:false;
      this.buttonDisabled = this.switchState;
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
      let ans;
      if (this.switchState){
        ans = await DeviceApi.setAction(this.blinds.id, 'open');
      }
      else{
        ans = await DeviceApi.setAction(this.blinds.id, 'close');
      }
      if (ans.result) {
        this.updateInfo();
      }
    },
    updateLevel: async function(i){
      try{
        this.switchLocked=true;
        await DeviceApi.setAction(this.blinds.id, 'setLevel', [this.blinds.state.level + i]);
        this.switchLocked=false;
        this.updateInfo();
      }catch(err){
        console.log(err);
      }
    },
    updateInfo: async function(){
      try{
        const ans = await DeviceApi.getState(this.blinds.id);
        this.blinds.state = ans.result;
        this.updateTitle();
        this.updateDesc();
        this.updateState();
      }catch (err){
        console.log(err);
      }
    },
    emitUpdDevs: async function(){
      this.$emit('upd_devs');
    }
  },
  beforeDestroy: function() {
    this.stopUpdating();
  }
};
</script>