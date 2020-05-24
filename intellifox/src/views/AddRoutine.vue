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
                    <v-btn @click="removeDev(deviceActions.device.id)" color="primary" x-small fab text >
                        <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <div v-for="actions in deviceActions.actions" :key="actions.id">
                        <v-btn @click="removeActionFromDev(deviceActions.device.id, actions.action.name)" color="primary" x-small fab text >
                            <v-icon>mdi-window-close</v-icon>
                        </v-btn>
                        {{actions.action.name.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase() )}}: {{actions.action.params.length > 0 ? printParams(actions.params) : '' }}
                    </div>
                </v-card-text>
                <v-card-text>
                    <v-btn @click="addActionCard(deviceActions.device)" color="primary" medium>
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
                                    <v-col  @click="action.params.length > 0 ? updateAndShowParams(action) : updateParams(action)" v-for="action in currDevAveilActions" :key="action.id">
                                        <v-row>
                                            <v-col cols="1"/>
                                            <v-col cols="8">
                                                <h1>{{ action.name.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase() ) }}</h1>
                                            </v-col>
                                        </v-row>
                                        <v-divider/>
                                    </v-col>
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
                            <v-row class="mt-5" v-for="(param,idx) in currAction.params" :key="param.id">
                                <v-btn-toggle v-if="param.supportedValues"
                                    mandatory
                                    tile
                                    class="mt-5"
                                >
                                    <v-btn @click="updateParamVal(val, idx)" v-for="val in param.supportedValues" :key="val.id">
                                        {{val}}
                                    </v-btn>
                                </v-btn-toggle>
                                <v-text-field v-else
                                    clearable
                                    v-model="params[idx]"
                                    :label="param.name"
                                    :hint="param.description + param.example ? '(example: ' + param.example + ')' : '' "
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
  import { DeviceApi, RoomApi, DeviceTypeApi, RoutineApi, Routine  } from '@/api';
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

            params: [],

            allDevActions: [],

            currDev: {},
            currAction: {},
            currActionParams: [],

            currDevAveilActions: {},
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
        updateParams: function(action){
            this.currAction = action;
            this.params = [];
            this.dialog2 = false;
            this.saveAction();
        },
        saveAction: function(){
            this.allDevActions.forEach(devAction => {
                if(devAction.device.id == this.currDev.id){
                    devAction.actions.push({
                        action: this.currAction,
                        params: this.params,
                    });
                }
            });
            this.params = [];
            this.dialog3 = false;
        },
        prevDialog: function(){
            this.dialog2 = true;
            this.dialog3 = false;
        },
        back: function(){
            router.go(-1);
        },
        saveRoutine: async function(){
            const routine = new Routine(null, this.name, this.buildFormatedActionArray(), {desc: this.desc, color: this.color });
            try {
                await RoutineApi.add(routine);
            } catch (err) {
                console.log(err);
            }
            router.go(-1);
        },
        buildFormatedActionArray: function(){
            const arr = [];
            this.allDevActions.forEach(devAction => {
                devAction.actions.forEach( action => {
                    arr.push({
                        device: {
                            id: devAction.device.id
                        },
                        actionName: action.action.name,
                        params: action.params,
                        meta: { },
                    })
                    console.log("id: " +  devAction.device.id);
                    console.log("actionName: " +  action.action.name);
                    console.log("params: " +  action.params);
                });
            }) 
            console.log(arr);
            return arr;
        },
        updateParamVal: function(val, index){
            this.params[index] = val;
        },
        printParams: function(params){
            let resp = '';
            params.forEach( p => {
                resp += p + ' ';
            })
            return resp;
        },
        removeActionFromDev: function(deviceId, actionName){
            this.allDevActions.forEach( devAction => {
                if(devAction.device.id == deviceId){
                    for( var i = 0; i < devAction.actions.length; i++){ 
                        if ( devAction.actions[i].action.name == actionName) {
                            devAction.actions.splice(i, 1);
                        }
                    }
                }
            });
        },
        removeDev: function(deviceId){
            for( var i = 0; i < this.allDevActions.length; i++){ 
                if(this.allDevActions[i].device.id == deviceId){
                    this.allDevActions.splice(i, 1);
                }
            }
        },
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