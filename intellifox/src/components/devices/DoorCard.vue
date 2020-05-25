<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard
        @set_switch_state="switchOnOff"
        @upd_devs="emitUpdDevs"
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
            <v-row class="d-flex justify-center">
              <v-btn
                x-large
                class="my-5"
                color="primary"
                @click="buttonSwitch(!locked)"
                :disabled="buttonDisabled"
                :buttonState="buttonState"
              >
                <v-icon class="ma-1">{{buttonText[`${locked}`].icon}}</v-icon>
                {{buttonText[`${locked}`].text}}
              </v-btn>
            </v-row>
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
      locked:false,
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
      const data = await JSON.parse(event.data);
      this.updateDevice(data);
    },
    subscribeToEvents: function() {
      if (!this.source) {
        if (!EventSource) {
          alert('Sorry, your browser does not support server-sent events.');
          return;
        }
        this.source = new EventSource(`${DeviceApi.url}/${this.door.id}/events`);
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
          this.door.state.status = data.args.newStatus;
          break;
        case 'lockChanged':
          this.door.state.lock = data.args.newLock;
          break;
        default:
          return;
      }
      
      this.updateState();      
      this.updateDesc();
    },
    updateTitle: function() {
      this.title = this.door.name;
    },
    updateDesc: function() {
      this.desc = `${(this.door.state.status === 'opened')? 'Opened':`Closed - ${(this.door.state.lock === 'locked')?'Locked':'Unlocked'}`}`;
    },
    updateState: function() {
      this.switchState = this.door.state.status === 'opened';
      this.locked = (this.door.state.lock === 'locked');
      this.switchLocked = !((this.door.state.status === "closed" && this.door.state.lock === "unlocked") || this.door.state.status === 'opened');
      this.buttonDisabled = this.switchState?true:false;
      console.log(`switchState: ${this.switchState}, locked: ${this.locked}`);
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

          this.updateState();
          this.updateDesc();
        }
      } catch (err) {
        console.log(err);
      }
    },
    buttonSwitch: async function(newValue) {
      this.locked = newValue;
      this.buttonDisabled = true;
      await this.buttonActions();
      this.buttonDisabled = false;
    },
    buttonActions: async function() {
      try {
        let ans;
        if (this.locked)
          ans = await DeviceApi.setAction(this.door.id, 'lock');
        else
          ans = await DeviceApi.setAction(this.door.id, 'unlock');
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
    emitUpdDevs: async function(){
      this.$emit('upd_devs');
    }
  },
  beforeDestroy: function() {
    this.unsubscribeToEvents();
  }
};
</script>
