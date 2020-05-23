<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard
        @set_switch_state="switchOnOff"
        :model="door"
        :switchState="switchState"
        :switchLoads="switchLoading"
        :switchLocked="switchLocked"
        :click="() => {show = !show}"
        :show="show"  
        :title="title" 
        :subtitle="desc" 
        icon="mdi-door">
      </TopCard>
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-btn 
              x-large 
              class="my-5" 
              color="primary" 
              @click="() => {
                locked=!locked;
                buttonActions();  
              }"
              :disabled="buttonDisabled"
              :buttonState="buttonState"
            >
              <v-icon class="ma-1">{{buttonText[`${!locked}`].icon}}</v-icon>
              {{buttonText[`${!locked}`].text}}
            </v-btn>
          </div>
        </v-expand-transition>
    </div>
  </v-card>
</template>

<script>
import { DeviceApi } from '@/api';
import TopCard from "@/components/devices/GenericTopCard";
export default {
  props: {
    model: Object,
  },
  components: {
    TopCard,
  },
  mounted: function() {
    this.locked = this.door.state.lock === 'locked';
    this.switchLocked = !((this.door.state.status === "closed" && this.door.state.lock === "unlocked") || this.door.state.status === 'opened');
    this.updateTitle();
    this.updateDesc();
    this.updateState();
    this.subscribeToEvents();
  },
  data: function() {
    return {
      source:undefined,

      show:false,
      switchState:false,
      switchLoading:false,
      switchLocked:false,
      locked:true,
      title: '',
      desc: '',

      buttonDisabled:false,
      buttonState:false,

      buttonText: {
        "true": {
          text: "unlock",
          icon: "mdi-lock-open-variant",
        },
        "false": {
          text: "lock",
          icon: "mdi-lock"
        },
      },
    }
  },
  computed: {
    door: {
      get: function() {
        return this.model;
      },
      set: function(newModel) {
        this.$emit('upd_model', newModel);
      }
    }
  },
  methods: {
    subscribeCallback: async function(event) {
          console.log("Received event");
          const data = await JSON.parse(event.data);
          this.updateDevice(data);
    },
    subscribeToEvents: function() {
      console.log("Subscribing");
      if (!EventSource) {
        alert('Sorry, your browser does not support server-sent events.');
        return;
      }
      this.source = new EventSource(`${DeviceApi.url}/${this.door.id}/events`);
      this.source.addEventListener('message', this.subscribeCallback, false);
    },
    unsubscribeToEvents: function() {
      console.log("Unsubscribing");
      this.source.removeEventListener('message', this.subscribeCallback);
    },
    updateDevice: function(data) {
      switch(data.event) {
        case 'statusChanged':
          this.door.state.status = data.args.newStatus;
          break;
        case 'lockChanged':
          this.door.state.lock = data.args.newLock;
          break;
        default:
          return;
      }
      console.log(this.door)
      this.locked = this.door.state.lock === 'locked';
      this.switchLocked = !((this.door.state.status === "closed" && this.door.state.lock === "unlocked") || this.door.state.status === 'opened');
      this.updateDesc();
      this.updateState();
    },
    updateTitle: function() {
      this.title = this.model.name;
    },
    updateDesc: function() {
      this.desc = `${(this.model.state.status === 'opened')? 'Opened':`Closed - ${(this.model.state.lock === 'locked')?'Locked':'Unlocked'}`}`;
    },
    updateState: function() {
      this.switchState = this.door.state.status === 'opened';
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
          ans = await DeviceApi.setAction(this.door.id, 'open');
        else
          ans = await DeviceApi.setAction(this.door.id, 'close');
        if (ans.result) {
          const ans2 = await DeviceApi.getState(this.door.id);
          this.door.state = ans2.result;
          this.updateTitle();
          this.updateDesc();
          this.updateState();
        } 
      } catch (err) {
        console.log(err);
      }
    },
    buttonLockSwitch: function() {
      if(this.buttonDisabled){
        this.buttonDisabled = false;
      }else{
        this.buttonDisabled = true;
      }
    },
    buttonActions: async function() {
      try {
        let ans;
        this.buttonLockSwitch();
        if (!this.locked)
          ans = await DeviceApi.setAction(this.door.id, 'lock');
        else
          ans = await DeviceApi.setAction(this.door.id, 'unlock');
        this.buttonLockSwitch();  
        if (ans.result) {
          const ans2 = await DeviceApi.getState(this.door.id);
          this.door.state = ans2.result;
          this.switchLocked = !((this.door.state.status === "closed" && this.door.state.lock === "unlocked") || this.door.state.status === 'opened');
          this.updateDesc();
          this.updateState();
        } 
      } catch (err) {
        console.log(err);
      }
    },
  },
  watch: {
    switchState: function(newValue) {
      this.buttonDisabled = newValue?true:false; // if opened, then disable button
    },
  },
  beforeDestroy: function() {
    this.unsubscribeToEvents();
  }
};
</script>