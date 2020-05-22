<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard
        @switch_changed="switchOnOff"
        :switchState="switchState"
        :switchLoads="switchLoading"
        :switchLocked="switchLocked"
        :click="() => {show = !show}" 
        :title="title" 
        :subtitle="desc" 
        icon="mdi-door"></TopCard>
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-btn x-large class="my-5" color="primary" v-if="locked" @click="locked=false">
                    <v-icon class="ma-1">mdi-lock-open-variant</v-icon>
                    Unlock
                  </v-btn>
                  <v-btn x-large class="my-5" color="primary" v-if="!locked" @click="locked=true">
                    <v-icon class="ma-1">mdi-lock</v-icon>
                    Lock
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
    this.door = this.model;
    this.updateTitle();
    this.updateDesc();
    this.updateState();
    console.log(this.door)
  },
  data: function() {
    return {
      show:false,
      switchState:false,
      switchLoading:false,
      switchLocked:false,
      locked:false,
      door: {},
      title: '',
      desc: '',
    }
  },
  methods: {
    updateTitle: function() {
      this.title = this.model.name;
    },
    updateDesc: function() {
      this.desc = `${(this.model.state.status === 'opened')? 'Opened':`Closed - ${(this.model.state.lock == 'blocked')?'Blocked':'Unblocked'}`}`;
    },
    updateState: function() {
      this.switchState = (this.door.state.status === 'opened')?true:false;
    },
    switchOnOff: async function(new_switch_state) {
      let ans;
      this.switchState = new_switch_state;
      this.switchLoading = true;
      this.switchLocked = true;
      if (new_switch_state)
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
      this.switchLocked = false;
      this.switchLoading = false;

      console.log(this.door);
    }
  },
};
</script>