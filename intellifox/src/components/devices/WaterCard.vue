<template> 
  <v-card class="device_card">
    <div class="device_top_card">
        <TopCard 
          @set_switch_state="switchOnOff"
          :model="model"
          :switchState="switchState"
          :switchLoads="switchLoading"
          :switchLocked="switchLocked"
          :click="() => {show = !show}" 
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
                    <v-btn class="ma-2" outlined medium color="error" @click="dialog=false">ok</v-btn>
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
  mounted: function() {
    this.tap = this.model;
    this.buttonDisabled = (this.tap.state.status === "closed");
    this.updateTitle();
    this.updateDesc();
    this.updateState();
    this.dialog=false;

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
      tap: {},

      units: [ "ml", "cl", "dl", "l", "dal", "hl", "kl" ],

      buttonDisabled:false,
      buttonState:false,
      buttonLoading:false,
    }
  },
  
  methods: {

    updateTitle: function() {
      this.title = this.model.name;
    },
    updateDesc: function() {
      this.desc = `${(this.model.state.status === 'closed')? 'Closed':`Open`}`;
    },
    updateState: function() {
      this.switchState = (this.tap.state.status === 'opened')?true:false;
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
        this.buttonDisabled = false;
      }
      else{
        ans = await DeviceApi.setAction(this.tap.id, 'close');
        this.buttonDisabled = true;
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
        console.log(this.quantity + " " + this.units[this.unitVar]);
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
  },
};
</script>