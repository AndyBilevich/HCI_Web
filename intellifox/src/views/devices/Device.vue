<template>
  <div>
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>{{`${typeTitle + 's'}`}}</h1>
    </v-row>
    <v-container>
      <v-row dense>
        <v-col v-for="d in devices" :key="d.id" cols="6">
          <component v-bind:is="types[typeTitle]" @upd_model="updateModel" @upd_devs="retrieveDevices" :model="d"/>
        </v-col>
      </v-row>
    </v-container>
    <v-btn @click="addDevice" class="add_btn" color="primary" fab big bottom right>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import storage from '@/storage';
import router from '@/router';
import { DeviceApi } from '@/api';
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
export default {
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
    created: async function() {
        console.log("Llegué");
        const home = await storage.getActualHome();
        this.home_id = home?home.id:'';
        this.typeName = this.$route.params.typeName;
        this.typeId = await storage.getTypeId(this.typeName); 
        this.typeTitle = await storage.getTypeTitle(this.typeName);
        this.retrieveDevices();
    },
    data: function() {
        return {
            typeId: '',
            typeName: '',
            typeTitle: '',
            home_id: '',
            devices: [],
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
    methods: {
        addDevice: async function() {
        router.push({path:'/devices/add', query:{deviceTypeId: this.typeId}});
        },
        retrieveDevices: async function() {
            try {      
                const ans2 = await DeviceApi.getDevicesByType(this.typeId);
                this.devices = ans2.result
                .filter(d => {
                    return !d.room || !d.room.home || d.room.home.id === this.home_id
                });
            }
            catch(err) {
                console.log(err);
            }
        },
        updateModel: function(newModel) {
        this.devices[this.devices.map((x, i) => [i, x]).filter(x => x[1].id == newModel.id)[0][0]] = newModel;  
        }
    },  
};
</script>
