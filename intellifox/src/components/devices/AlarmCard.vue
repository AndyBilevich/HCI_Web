<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard 
        @set_switch_state="switchOnOff"
        @upd_devs="emitUpdDevs"
        :model="alarm"
        :switchState="switchState"
        :switchLoads="switchLoading"
        :switchLocked="switchLocked"
        :click="() => {show = !show}"
        :show="show" 
        :title="title" 
        :subtitle="desc" 
        icon="mdi-alarm-light-outline"></TopCard>
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

              <h3 align="left"  class="mt-5 ml-5">Change code:</h3>
              <v-row>         
                <v-col cols="1"></v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="oldCode"
                    :disabled="disabledText"
                    counter="4"
                    label="Old code"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="newCode"
                    counter="4"
                    label="newCode"
                  ></v-text-field>
                </v-col>
                <v-col cols="1"></v-col>
                <v-btn 
                  large 
                  class="primary" 
                  @click="() => {
                    setNewCode();  
                  }">Change code</v-btn> 
              </v-row>

              <v-row class="my-5"></v-row>

              <h3 align="left" class="ml-5">Mode:</h3>
              <v-row class="mt-5">
                <v-col cols="1"></v-col>
                <v-col cols="3">
                  <v-text-field
                      v-model="insertedCode"
                      counter="4"
                      label="insert your code"
                  ></v-text-field>
                </v-col>
                <v-col cols="1"></v-col>
                <v-btn-toggle tile mandatory class="mb-5">
                  <v-btn @click="houseMode=true">
                    House mode
                  </v-btn>
                  <v-btn @click="houseMode=false">
                    Regular mode
                  </v-btn>
                </v-btn-toggle>
              </v-row>

              <v-dialog
                v-model="dialog"
                max-width="300"
              >
                <v-card class="pa-5 background3">
                  <v-col cols="1"></v-col>
                    <h3 class="error--text">ERROR</h3>
                    <p>Please insert a 4 digit code between 0000 and 9999</p>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-btn class="ma-2" outlined medium color="error" @click="dialog=false">ok</v-btn>
                  </v-row> 
                </v-card>
              </v-dialog>

              <v-dialog
                v-model="dialog2"
                max-width="300"
              >
                <v-card class="pa-5 background3">
                  <v-col cols="1"></v-col>
                    <h3 class="error--text">ERROR</h3>
                    <p>Incorrect code</p>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-btn class="ma-2" outlined medium color="error" @click="dialog2=false">ok</v-btn>
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
    this.switchLocked = !this.hasCode;  
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

      houseMode:true,

      hasCode:false,
      code:'0000',
      oldCode:'0000',
      newCode:'',
      insertedCode:'',

      disabledText:true,

      dialog:false,
      dialog2:false,
    }
  },
  computed: {
    alarm: {
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
        this.source = new EventSource(`${DeviceApi.url}/${this.alarm.id}/events`);
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
      this.alarm.state.status = data.args.newStatus;
      this.updateDesc();
      this.updateState();
    },
    updateTitle: function() {
      this.title = this.alarm.name;
    },
    updateDesc: function() {
      this.desc = `${(this.alarm.state.status === 'armed')? `Armed - ${(this.houseMode)?'House mode':'Regular mode'}` : 'Unarmed'}`;
    },
    updateState: function() {
      this.switchState = this.alarm.state.status === 'armed';
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
        console.log("code " + this.code + " imput " + this.insertedCode);
        if(!this.checkCode(this.insertedCode) || this.insertedCode != this.code){
          this.insertedCode='';
          this.dialog2=true;
          return;
        }
        if (this.switchState){
          if (this.houseMode)
            ans = await DeviceApi.setAction(this.alarm.id, 'armStay', [this.code]);
          else
            ans = await DeviceApi.setAction(this.alarm.id, 'armAway', [this.code]);
        }
        else
          ans = await DeviceApi.setAction(this.alarm.id, 'disarm', [this.code]);
        if (ans.result) {
          const ans2 = await DeviceApi.getState(this.alarm.id);
          this.alarm.state = ans2.result;
          this.updateTitle();
          this.updateDesc();
          this.updateState();
        }
      } catch (err) {
        console.log(err);
      }
    },
    checkCode: function(code){
      if(parseInt(code) > 9999 || isNaN(parseInt(code) || code.length != 4))
        return false;
      for(let i=0; i<4; i++){
        if(!this.isNumber(code.charAt(i)))
          return false;
      }
      return true;
    },
    isNumber: function(char){
      return (char == '0'||char == '1'||char == '2'||char == '3'||char == '4'||char == '5'||char == '6'||char == '7'||char == '8'||char == '9')
    },
    setNewCode: async function(){
      if(!this.hasCode)
        this.hasCode=true;  
      else{
        if(!this.checkCode(this.oldCode) || this.oldCode != this.code){
          this.oldCode='';
          this.dialog2=true;
          return;
        }
      }
      if(!this.checkCode(this.newCode)){
        this.newCode='';
        this.dialog=true;
        return;
      }
      try{  
        this.switchLocked=true;
        console.log(" oldCode " + this.oldCode + " code " + this.code + " new code " + this.newCode);
        await DeviceApi.setAction(this.alarm.id, 'changeSecurityCode', [this.oldCode, this.newCode]);
        this.disabledText=false;
        this.code=this.newCode;
        this.newCode='';
        this.oldCode='';
        this.switchLocked=false;
        console.log(" oldCode " + this.oldCode + " code " + this.code + " new code " + this.newCode);
        this.updateInfo();
      }catch(err){
        console.log(err);
      }

    },
    updateInfo: async function(){
      try{
        const ans = await DeviceApi.getState(this.alarm.id);
        this.alarm.state = ans.result;
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
