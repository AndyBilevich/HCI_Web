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
        icon="mdi-robot-vacuum">
      </TopCard>
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-row>
                <v-col cols ="1">
                  <v-spacer></v-spacer>
                </v-col>
                <v-col cols ="4">
                  <v-btn-toggle
                    v-model="mode"
                    mandatory
                    tile
                    class="py-5"
                    :loading="modeButtonLoading"
                  >
                    <v-btn
                      @click="() => {  
                        setToVacuum(); 
                      }"
                    >
                      <v-icon>mdi-fan</v-icon>
                      vacuum
                    </v-btn>
                    <v-btn
                      @click="() => {  
                        setToMop(); 
                      }"
                    >
                      <v-icon>mdi-broom</v-icon>
                      mop
                    </v-btn>
                  </v-btn-toggle>
                </v-col>
                <v-col cols ="2">
                  <v-spacer></v-spacer>
                </v-col>
                <v-col cols="3">
                  <v-btn 
                    large 
                    class="ma-5" 
                    color="primary"
                    @click="() => {  
                      dockButton(); 
                    }"
                    :disabled="dockButtonDisabled"
                    :buttonState="dockButtonState"
                    :loading="dockButtonLoading"
                  >
                    <v-icon class="ma-1">{{buttonText[`${!dockButtonDisabled}`].icon}}</v-icon>
                    {{buttonText[`${!dockButtonDisabled}`].text}}
                  </v-btn>
                </v-col>
            </v-row>
            <v-row>
              <v-col cols ="1">
                <v-spacer></v-spacer>
              </v-col>
              <v-col cols ="3">
                  <h3 class="pt-5">Location:</h3>
              </v-col>
              <v-col cols="5">
              <v-overflow-btn
                  v-model="selectedRoomID"
                  solo
                  :items="rooms"
                  label="None"
                  color="background1"
                  @change="() => {  
                    changeLocation(); 
                  }"
              ></v-overflow-btn>
              </v-col>
            </v-row>

          </div>
        </v-expand-transition>
    </div>
  </v-card>
</template>

<script>
import { DeviceApi, RoomApi} from '@/api';
import TopCard from "@/components/devices/GenericTopCard.vue";
export default {
  components: {
    TopCard,
  },
  props: {
    model: Object,
  },
  mounted: function() {
    this.vacuum = this.model;
    this.mode = this.vacuum.state.mode === 'vacuum' ? 0 : 1;
    if (this.vacuum.state.status === 'inactive' && this.vacuum.state.batteryLevel > 4)
      this.switchLocked = false;
    if (this.vacuum.state.status === 'docked')
      this.dockButtonDisabled = true;
    this.updateInfo();
    this.retrieveRooms();
    this.selectedRoomID = this.vacuum.state.location.id;
  },
  data: function() {
    return {
      show:false,
      play:false,
      switchState:false,
      switchLoading:false,
      switchLocked:false,
      locked:true,
      vacuum: {},
      title: '',
      desc: '', 
      mode: 0,
      selectedRoomID: 0,
      rooms: [],

      dockButtonState:false,
      dockButtonLoading: false,
      dockButtonDisabled: false,

      modeButtonLoading: false,

      buttonText: {
        "true": {
          text: "Dock",
          icon: "mdi-power-plug",
        },
        "false": {
          text: "Charging",
          icon: "mdi-lightning-bolt"
        },
      },

    }
  },
  methods: {
    updateTitle: function() {
      this.title = this.model.name;
    },
    updateDesc: function() {
      let activity = this.vacuum.state.status;
      let mode = this.model.state.mode;
      let battery = this.vacuum.state.batteryLevel;
      let location = this.vacuum.state.location.name;
      this.desc = `Status: ${activity} - Mode: ${mode} - At: ${location} -Battery level: ${battery}`;
    },
    updateState: function() {
      this.switchState = (this.vacuum.state.status === 'active')?true:false;
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
          ans = await DeviceApi.setAction(this.vacuum.id, 'start');
        }catch(err){
          console.log(err);
        }
        this.dockButtonState = false;
        this.dockButtonDisabled = false;
      }else{
        try{
          ans = await DeviceApi.setAction(this.vacuum.id, 'pause');
        }catch(err){
          console.log(err);
        }
      }
      if (ans.result) {
        this.updateInfo();
      }
    },
    dockButton: async function(){
      this.dockButtonState = true;
      this.dockButtonLoading = true;
      this.dockButtonDisabled = true;
      try{
        await this.dockButtonActions();
      }catch(err){
        console.log(err);
      }
      this.dockButtonLoading = false;
    },
    dockButtonActions: async function(){
      try{
        let ans = await DeviceApi.setAction(this.vacuum.id, 'dock');
        if (ans.result) {
            this.updateInfo();
        }
      }catch(err){
        console.log(err);
      }
    },
    setToVacuum: async function(){
      try{
        this.modeButtonLoading = true;
        await DeviceApi.setAction(this.vacuum.id, 'setMode', ["vacuum"]);
        this.modeButtonLoading = false;
        this.updateInfo();
      }catch(err){
        console.log(err);
      }
    },
    setToMop: async function(){
      try{
        this.modeButtonLoading = true;
        await DeviceApi.setAction(this.vacuum.id, 'setMode', ["mop"]);
        this.modeButtonLoading = false;
        this.updateInfo();
      }catch(err){
        console.log(err);
      }
    },
    updateInfo: async function(){
      try{
        const ans = await DeviceApi.getState(this.vacuum.id);
        this.vacuum.state = ans.result;
        this.updateTitle();
        this.updateDesc();
        this.updateState();
      }catch (err){
        console.log(err);
      }
    },
    retrieveRooms: async function() {
      try {
        const ans = await RoomApi.getAll();
        this.rooms = [];
        ans.result.forEach(room => {
          this.rooms.push({
            text: room.name,
            value: room.id,
          })
        }) 
      }
      catch(err) {
        console.log(err);
      }
    },
    changeLocation: async function(){
      console.log(this.selectedRoomID);
      try{
        this.modeButtonLoading = true;
        await DeviceApi.setAction(this.vacuum.id, 'setLocation', [this.selectedRoomID]);
        this.modeButtonLoading = false;
        this.updateInfo();
      }catch(err){
        console.log(err);
      }
    }
  },
};
</script>