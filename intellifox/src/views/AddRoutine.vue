<template>
  <div>
    <h1 class="text-left">Add Routine</h1>
        <v-row>
            <v-col cols="6">
                <v-row>
                    <v-col cols="10">
                        <h3 align="left">Name:</h3>
                        <v-text-field 
                            label="Name" 
                            solo
                            v-model="name"
                        />
                    </v-col>
                </v-row>    
                <v-row>
                    <v-col cols="10">
                        <h3 align="left">Description (optional):</h3>
                        <v-text-field 
                            label="Description" 
                            solo
                            v-model="desc"
                        />
                    </v-col>
                </v-row>
                <v-row class="pl-2">
                    <h3 class="pt-5">Require PIN code:</h3>
                    <v-checkbox
                        v-model="checkbox"
                    ></v-checkbox>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <h3 class="text-left">Chosen Color:</h3>
                    </v-col>
                    <v-col cols="3">
                         <v-icon large :color="showColor" >mdi-circle</v-icon>
                    </v-col>
                    <v-col cols="3">
                         <h3 class="text-left">{{ showColor }}</h3>
                    </v-col>
                </v-row>
            </v-col>
         
            <v-col cols="6" >
                <h3 align="left">Choose color:</h3>
                <v-row>
                    <v-color-picker v-model="color" hide-inputs></v-color-picker>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-card class="ml-5 mt-5" v-for="deviceActions in allDevActions" :key="deviceActions.id">
                <v-card-title class="headline">
                    {{deviceActions.device.name}}
                </v-card-title>
                <v-card-text>
                    <div v-for="actions in deviceActions.actions" :key="actions.id">
                        {{actions.action.name}} {{actions.params}}
                    </div>
                </v-card-text>
                <v-card-text>
                    <v-btn @click="addActionCard(deviceActions.device)" color="primary" medium v-on="on">
                        <v-icon>mdi-plus</v-icon> Add Action
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-row>
        <v-row>
             <v-col cols="4">
                <v-dialog v-model="dialog1" scrollable max-width="600px" >
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" x-large v-on="on">
                            <v-icon>mdi-plus</v-icon>
                            Add Device Action
                        </v-btn>
                    </template>
                    <v-card color="background3">
                        <v-card-title>
                            <span class="headline">Add Action</span>
                        </v-card-title>
                        <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="6">
                                    <v-select
                                    :items="rooms"
                                    label="Room"
                                    ></v-select>
                                </v-col>
                                <v-col cols="6">
                                    <v-select
                                    :items="types"
                                    label="Type"
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col align="center">
                                    <v-text-field
                                        background2-color="background2"
                                        placeholder="Search..."
                                        clearable
                                        solo
                                        append-icon="mdi-magnify"
                                        hide-details
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-card  class="box" color="background2" width="100%">
                                    <div v-for="device in devices" :key="device.id">
                                        <v-row @click="addDevCard(device.id)">
                                            <v-col cols="1"/>
                                            <v-col cols="9">
                                                <h1>{{ device.name }}</h1>
                                            </v-col>
                                        </v-row>
                                        <v-divider/>
                                    </div>
                                </v-card>
                            </v-row>
                        </v-container>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialog2" scrollable max-width="600px" >
                    <v-card color="background3">
                        <v-card-title>
                            <span class="headline">{{currDev.name}} Actions</span>
                        </v-card-title>
                        <v-card-text>
                        <v-container>
                            <v-row>
                                <h2>Choose Action</h2>
                            </v-row>
                            <v-row class="mt-5">
                                <v-card  class="box" color="background2" width="100%">
                                    <div  @click="updateAndShowParams(action)" v-for="action in currDevAveilActions" :key="action.id">
                                        <v-row>
                                            <v-col cols="1"/>
                                            <v-col cols="8">
                                                <h1>{{ action.name }}</h1>
                                            </v-col>
                                        </v-row>
                                        <v-divider/>
                                    </div>
                                </v-card>
                            </v-row>
                        </v-container>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialog3" scrollable max-width="600px" >
                    <v-card color="background3">
                        <v-card-title>
                            <v-btn  @click="prevDialog" color="primary" fab big bottom text right>
                                <v-icon x-large >mdi-keyboard-backspace</v-icon>
                            </v-btn>
                            <span class="headline">{{currAction.name}}</span>
                        </v-card-title>
                        <v-card-text>
                        <v-container>
                            <v-row class="mt-5" v-for="param in currAction.params" :key="param.id">
                                <v-text-field
                                    clearable
                                    v-model="paramVal"
                                    :label="param.name"
                                    :hint="param.description"
                                    single-line
                                    persistent-hint
                                    filled
                                ></v-text-field>
                            </v-row>
                        </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="ma-2" outlined large color="primary" @click="dialog3 = false">Close</v-btn>
                            <v-btn class="my-2" depressed large color="primary" @click="saveAction">Add</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>

        <v-row align="end">
            <v-col cols="8"></v-col>
            <v-btn class="ma-2" @click="back" outlined large color="primary">Cancel</v-btn>
            <div class="my-2">
                <v-btn @click="saveRoutine" depressed large color="primary">Save</v-btn>
            </div>
        </v-row>
  </div>
</template>



<script>
  import router from '@/router';
  import { DeviceApi, RoomApi, DeviceTypeApi } from '@/api';
  export default {
    data: function() {
        return {
            name: '',
            desc: '',
            type: 'hex',
            hex: '#FF00FF',
            dialog1: false,
            dialog2: false,
            dialog3: false,
            checkbox: false,
            devices: [],
            rooms: [],
            types: [],
            paramVal: '',

            allDevActions: [],

            currDev: {},
            currAction: {},
            currActionParams: [],

            currDevAveilActions: {},
            currDevChosenAction: {},
            currDevAveilActionParams: [],
            
        }
    },
    mounted: function(){
        this.retrieveDevice();
        this.retrieveRooms();
        this.retrieveTypes();
    },
    methods: {
        retrieveDevice: async function(){
            try {
                const ans = await DeviceApi.getAll(); 
                this.devices = ans.result;
            } catch (err) {
            console.log(err);
            }
        },
        retrieveRooms: async function(){
            try {
                const ans = await RoomApi.getAll();
                this.rooms = [ "none" ];
                ans.result.forEach(room => {
                    this.rooms.push(room.name);
                }) 
            } catch (err) {
            console.log(err);
            }
        },
        retrieveTypes: async function(){
            try {
                const ans = await DeviceTypeApi.getAll();
                this.types = [ "none" ];
                ans.result.forEach(type => {
                    this.types.push(type.name);
                }) 
            } catch (err) {
            console.log(err);
            }
        },
        addDevCard: async function(id){
            try {
                const ans = await DeviceApi.get(id); 
                this.currDev = ans.result;
                this.allDevActions.push({
                    device: ans.result,
                    actions: [],
                })
                this.dialog1 = false;
            } catch (err) {
                console.log(err);
            }
        },
        addActionCard: async function(device){
            this.currDev = device;
            try {
                const ans = await DeviceTypeApi.get(this.currDev.type.id); 
                this.currDevAveilActions = ans.result.actions;
            } catch (err) {
                console.log(err);
            }
            this.dialog2 = true;
        },
        updateAndShowParams: function(action){
            this.currAction = action;
            this.dialog2 = false;
            this.dialog3 = true;
        },
        saveAction: function(){
            console.log("actions: " + JSON.stringify(this.allDevActions[0].actions));
            this.allDevActions.forEach(devAction => {
                if(devAction.device.id == this.currDev.id){
                    devAction.actions.push({
                        action: this.currAction,
                        params: this.paramVal,
                    });
                }
            });
            this.dialog3 = false;
            console.log("actions: " + JSON.stringify(this.allDevActions[0].actions));
        },
        prevDialog: function(){
            this.dialog2 = true;
            this.dialog3 = false;
        },
        back: function(){
            router.go(-1);
        },
        saveRoutine: function(){
            // try {

            // } catch (err) {
                
            // }
        }
    },
    computed: {
      color: {
        get () {
          return this[this.type]
        },
        set (v) {
          this[this.type] = v
        },
      },
      showColor () {
        if (typeof this.color === 'string') return this.color

        return JSON.stringify(Object.keys(this.color).reduce((color, key) => {
          color[key] = Number(this.color[key].toFixed(2))
          return color
        }, {}), null, 2)
      },
    }
  }
</script>


<style scoped>
.box{
    height: 300px; 
    overflow-y: scroll; 
    overflow-x: hidden;
}
</style>

<!-- 

{
  "name": "good night",
  "actions": [
    {
      "device": {
        "id": "c39181d52abe5555"
      },
      "actionName": "turnOff",
      "params": [],
      "meta": {}
    },
    {
      "device": {
        "id": "f597c13717008fb1"
      },
      "actionName": "armStay",
      "params": [
        "1234"
      ],
      "meta": {}
    }
  ],
  "meta": {}
}


-->