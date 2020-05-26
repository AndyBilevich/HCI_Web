<template>
    <div class="Favourites">
        <v-row>
            <v-col cols="11">
                <v-row>
                    <router-link class="routerLink" to="/rooms">
                        <v-btn color="primary" fab big bottom text right>
                            <v-icon x-large >mdi-keyboard-backspace</v-icon>
                        </v-btn>
                    </router-link>
                    <h1>Favourites</h1>
                </v-row>
            </v-col>
        </v-row>
        <h1>Devices</h1>
        <div v-if="devices.length === 0">
            <v-row class="d-flex justify-center">
                <h3 class="noItemsMessage" align="center"> {{noDevicesText}} </h3>
            </v-row>
        </div>
        <div v-else>
            <v-row dense>
                <v-col v-for="d in devices" :key="d.id" cols="6">
                    <component v-bind:is="types[typesInfo[d.type.name].title]" @upd_model="updateModel" @upd_devs="retrieveDevices" :model="d"/>
                </v-col>
            </v-row>
        </div>
        <v-devider/>
        <h1>Routines</h1>
        <div v-if="routines.length === 0">
            <v-row class="d-flex justify-center">
                <h3 class="noItemsMessage" align="center"> {{noRoutinesText}} </h3>
            </v-row>
        </div>
        <div v-else>
            <v-row dense>
                <v-col cols="6" v-for="r in routines" :key="r.id">
                    <RoutineCard @upd="retrieveRoutines" :id="routine.id"/>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import storage from '@/storage';
import RoutineCard from "@/components/RoutineCard.vue";
//import router from '@/router';
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
import { DeviceApi, RoutineApi } from '@/api';
    export default {
        components: {
            RoutineCard
        },
        data: function() {
            return {
                home_id: '',
                noRoutinesText: "",
                noDevicesText: "",
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
                devices: [],
                routines: [],
                typesInfo: {},
                types: {
                    'Speaker': SpeakerCard,
                    'Tap': WaterCard,
                    'Air Conditioner': AirConditionerCard,
                    'Light': LightCard,
                    'Vacuum': VacuumCard,
                    'Alarm': AlarmCard,
                    'Oven': OvenCard,
                    'Door': DoorCard,
                    'Fridge': FridgeCard,
                    'Blind': WindowCard
                }
            }
        },
        mounted: async function() {
            const home = await storage.getActualHome();
            this.home_id = home?home.id:'';
            this.typesInfo = await storage.getAllTypes();
            await this.retrieveDevices();
            await this.retrieveRoutines();
            //console.log(this.typesInfo);
        },
        methods: {
            retrieveDevices: async function() {
                try {
                    const aux = await DeviceApi.getAll();
                    this.devices = [];
                    if (aux.result) {
                        aux.result.forEach(d => {
                            if((!d.room || !d.room.home || d.room.home.id == this.home_id) && d.meta.favourites)
                                this.devices.push(d);
                        })
                    }
                } catch (err) {
                    console.log(err);
                }
                this.noDevicesText = "You don't have devices added to favourites. Add one pressing the heart button in the device you want to add."
            },
            retrieveRoutines: async function() {
                try {
                    const aux = await RoutineApi.getAll();
                    this.routines = [];
                    if (aux.result) {
                        aux.result.forEach(r => {
                            if(r.meta.favourites)
                                this.routines.push(r);
                        })
                    }
                } catch (err) {
                    console.log(err);
                }
                this.noRoutinesText = "You don't have rutines added to favourites. Add one pressing the heart button in the rutine you want to add."
            },
            retrieveRoutines: async function(){
                try {
                    const aux = await RoutineApi.getAll();
                    if (aux.result) {
                        aux.result.forEach(d => {
                            if( d.meta.favourites)
                                this.devices.push(d);
                        })
                    }
                } catch (err) {
                    console.log(err);
                }
            },
            updateModel: function(newModel) {
                this.devices[this.devices.map((x, i) => [i, x]).filter(x => x[1].id == newModel.id)[0][0]] = newModel;
            },
        }
    }
</script>
