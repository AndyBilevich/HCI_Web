<template>
    <div class="room">
        <v-row>
            <v-col cols="1">
                <router-link class="routerLink" to="/rooms">
                    <v-btn color="primary" fab big bottom text right>
                        <v-icon x-large >mdi-keyboard-backspace</v-icon>
                    </v-btn>
                </router-link>
            </v-col>
            <v-col cols="10">
                <h1>{{room.name}}</h1>
            </v-col>
            <v-col cols="1">  
                <v-menu close-on-click close-on-content-click class="menu">
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" text icon>
                            <v-icon large color="text">mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click="editRoom">
                            <v-btn text>
                                <v-icon>mdi-pencil</v-icon> 
                                Edit
                            </v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-btn 
                            text
                            @click="dialog = true"
                            >
                                <div>
                                    <v-icon>mdi-trash-can</v-icon>
                                    Delete
                                </div>
                            </v-btn>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col v-for="d in devices" :key="d.id" cols="6">
                <component v-bind:is="types[d.type.id]" @upd_model="updateModel" @upd_devs="retrieveDevices" :model="d"/>
            </v-col>
        </v-row>

        <v-btn @click="addDevice" class="add_btn" color="primary" fab big bottom right>
            <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-dialog
            v-model="dialog"
            max-width="290"
        >
            <v-card color="background3">
                <v-card-title class="headline">Be careful</v-card-title>

                <v-card-text>
                    Are you sure you want to delete this room? <br/> This action is irreversible.
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                    color="window"
                    @click="dialog = false"
                    >
                        Cancel
                    </v-btn>

                    <v-btn
                    color="error"
                    @click="() => {
                        dialog = false
                        deleteRoom();
                    }"
                    >
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import router from '@/router';
import {
    SpeakerCard, 
    WaterCard,
    AirConditionerCard,
    LightCard,
    VacuumCard,
    AlarmCard,
    OvenCard,
    DoorCard,
    FridgeCard,
    WindowCard
} from '@/components/devices'
import { RoomApi, HomeApi , DeviceApi } from '@/api';
    export default {
        data: function() {
            return {
                dialog: false,
                components: {
                    SpeakerCard,
                    WaterCard,
                    AirConditionerCard,
                    LightCard,
                    VacuumCard,
                    AlarmCard,
                    OvenCard,
                    DoorCard,
                    FridgeCard,
                    WindowCard,
                },
                room: {
                    meta: {}
                },
                devices: [],
                types: {
                    'c89b94e8581855bc': SpeakerCard,
                    'dbrlsh7o5sn8ur4i': WaterCard,
                    'li6cbv5sdlatti0j': AirConditionerCard,
                    'go46xmbqeomjrsjr': LightCard,
                    'ofglvd9gqx8yfl3l': VacuumCard,
                    'mxztsyjzsrq7iaqc': AlarmCard,
                    'im77xxyulpegfmv8': OvenCard,
                    'lsf78ly0eqrjbz91': DoorCard,
                    'rnizejqr2di0okho': FridgeCard,
                    'eu0v2xgprrhhg41g': WindowCard,
                }
            }
        },
        mounted: function() {
            this.room.id = this.$route.params.id;
            this.retrieveRoom(this.room.id);
            this.retrieveDevices();
        },
        methods: {
            addDevice: async function() {
                router.push({path:'/devices/add', query:{roomId: this.room.id}});
            },
            retrieveRoom: async function() {
                console.log(`Room ID: ${this.room.id}`);
                const ans = await RoomApi.get(this.room.id);
                this.room = ans.result;
                console.log(ans.result);
            },
            deleteRoom: async function() {
                try {
                    await RoomApi.delete(this.room.id);
                    var auxHomeId = this.room.home ? this.room.home.id : 'none';
                    if(auxHomeId !== 'none'){ 
                        const ans2 = await HomeApi.get(auxHomeId);
                        const auxHome = ans2.result;
                        
                        auxHome.meta.rooms = auxHome.meta.rooms - 1;
                        await HomeApi.modify(this.auxHome);

                        // const ans3 = await HomeApi.get(auxHomeId);
                        // this.auxHome = ans3.result;
                        
                        // console.log(JSON.stringify(this.auxHome));
                    }
                } catch (err) {
                    console.log(err);
                }
                router.go(-1);
            },
            editRoom: function() {
                var homeid = this.room.home ? this.room.home.id : 'none';
                router.push({ name:"EditRoom", params:{ id: this.room.id}, query:{ icon: this.room.meta.icon, home:homeid }})
            },
            retrieveDevices: async function() {
                console.log("Retrieving devices");
                const aux = await DeviceApi.getAll();
                console.log(aux.result);
                this.devices = [];
                if (aux.result) {
                    aux.result.forEach(d => {
                        if(d.room && d.room.id === this.room.id)
                            this.devices.push(d);
                        console.log(JSON.stringify(this.types[d.type.id]));
                    })
                }
                console.log("Here is devices");
                console.log(this.devices);
            },
            updateModel: function(newModel) {
                this.devices[this.devices.map((x, i) => [i, x]).filter(x => x[1].id == newModel.id)[0][0]] = newModel; 
            },
        }
    }
</script>



