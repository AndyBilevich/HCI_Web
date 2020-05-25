<template> 
  <v-card class="device_card">
    <div class="device_top_card">
        <TopCard 
          @set_switch_state="switchOnOff"
          @upd_devs="emitUpdDevs"
          :model="tap"
          :switchState="switchState"
          :switchLoads="switchLoading"
          :switchLocked="switchLocked"
          :click="() => {show = !show}" 
          :show="show"
          :title="title" 
          :subtitle="desc" 
          icon="mdi-water-pump">
        </TopCard>
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-col>
              <h3 align="left" >Dispence:</h3>
              <v-col>
                  <v-row> 
                    
                      <v-col cols="4">
                        <v-text-field
                          v-model="quantity"
                          counter="3"
                          type="number"
                          label="How many?"
                        ></v-text-field>
                      </v-col>
                  
                      <v-btn-toggle 
                        v-model="unitVar"
                        class="ml-5 mt-4" 
                        tile 
                        mandatory
                      >
                        <v-btn v-for="unit in units" :key="unit.id">
                          {{unit}}
                        </v-btn> 
                      </v-btn-toggle>
                  </v-row>
                 <v-btn 
                  class="primary" 
                  large
                    @click="() => {
                      dispenser();  
                    }"
                    :disabled="buttonDisabled"
                    :buttonState="buttonState"
                    :loading="buttonLoading"
                 >
                  dispense
                 </v-btn>
                
              </v-col>
            </v-col>

            <v-dialog
                v-model="dialog"
                max-width="300"
              >
                <v-card class="pa-5 background3">
                  <v-col cols="1"></v-col>
                    <h3 class="error--text">ERROR</h3>
                    <p>Please insert a value between 1 and 100</p>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-btn class="ma-2" outlined medium color="primary" @click="dialog=false">ok</v-btn>
                  </v-row> 
                </v-card>
              </v-dialog>

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
    tap: {
      get: function() {
        return this.model;
      },
      set: function(newModel) {
        this.$emit('upd_model', newModel);
      }
    }
  },
  mounted: function() {
    this.buttonDisabled = (this.tap.state.status != "closed");
    this.updateTitle();
    this.updateDesc();
    this.updateState();
    this.dialog=false;
    this.subscribeToEvents();
  },
  data: function() {
    return {
      quantity:undefined,
      validQuantity:false,
      unitVar:'',
      dialog:false,

      show:false,
      switchState:false,
      switchLoading:false,
      switchLocked:false,
      title: '',
      desc: '',

      units: [ "ml", "cl", "dl", "l", "dal", "hl", "kl" ],

      buttonDisabled:false,
      buttonState:false,
      buttonLoading:false,
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
        this.source = new EventSource(`${DeviceApi.url}/${this.tap.id}/events`);
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
      this.tap.state.status = data.args.newStatus;
      this.updateDesc();
      this.updateState();
    },
    updateTitle: function() {
      this.title = this.tap.name;
    },
    updateDesc: function() {
      this.desc = `${(this.tap.state.status === 'closed')? 'Closed':`Open`}`;
    },
    updateState: function() {
      this.switchState = (this.tap.state.status === 'opened')?true:false;
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
        ans = await DeviceApi.setAction(this.tap.id, 'open');
        this.buttonDisabled = true;
      }
      else{
        ans = await DeviceApi.setAction(this.tap.id, 'close');
        this.buttonDisabled = false;
      }
      if (ans.result) {
        const ans2 = await DeviceApi.getState(this.tap.id);
        this.tap.state = ans2.result;
        this.updateTitle();
        this.updateDesc();
        this.updateState();
      }
    },

    dispenser: async function(){
      try{
        if(this.quantity > 100 || this.quantity == null){
          this.dialog=true;
          this.quantity=undefined;
          return;
        }
        this.buttonLoading = true;
        this.switchLocked=true;
        await DeviceApi.setAction(this.tap.id, 'dispense', [this.quantity, this.units[this.unitVar]]);
        this.switchLocked=false;
        this.buttonLoading = false;
        this.updateInfo();
      }catch(err){
        console.log(err);
      }
    },
    updateInfo: async function(){
      try{
        const ans = await DeviceApi.getState(this.tap.id);
        this.tap.state = ans.result;
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
};
</script>