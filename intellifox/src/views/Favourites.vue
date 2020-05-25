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


        <div v-if="devices.length === 0">
            <v-row class="d-flex justify-center">
                <h3 class="noItemsMessage" align="center"> {{noItemsText}} </h3>
            </v-row>
        </div>
        <div v-else>
            <v-row dense>
                <v-col v-for="d in devices" :key="d.id" cols="6">
                    <component v-bind:is="types[typesInfo[d.type.name].title]" @upd_model="updateModel" @upd_devs="retrieveDevices" :model="d"/>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import storage from '@/storage';
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
import { DeviceApi } from '@/api';
    export default {
        data: function() {
            return {
                noItemsText: "",
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
            this.typesInfo = await storage.getAllTypes();
            await this.retrieveDevices();
            //console.log(this.typesInfo);
        },
        methods: {
            retrieveDevices: async function() {
                try {
                    const aux = await DeviceApi.getAll();
                    this.devices = [];
                    if (aux.result) {
                        aux.result.forEach(d => {
                          console.log(d);
                            if(d.favourites)
                                this.devices.push(d);
                        })
                    }
                } catch (err) {
                    console.log(err);
                }
                this.noItemsText = "You don't have devices/rutines added to favourites. Add one pressing the heart button in the device/rutine you want to add."
            },
            updateModel: function(newModel) {
                this.devices[this.devices.map((x, i) => [i, x]).filter(x => x[1].id == newModel.id)[0][0]] = newModel;
            },
        }
    }
</script>
