import { DeviceTypeApi } from '@/api';

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
} from '@/components/devices';

const types = {
    'speaker': {
        component: SpeakerCard, 
        title: 'Speaker',
        roomTitle: 'Speakers'
    },
    'faucet': {
        component: WaterCard,
        title: 'Tap',
        roomTitle: 'Taps'
    },
    'ac': {
        component: AirConditionerCard,
        title: 'Air Conditioner',
        roomTitle: 'Air Conditioners'
    },
    'lamp': {
        component: LightCard, 
        title: 'Light',
        roomTitle: 'Lights'
    },
    'vacuum': {
        component: VacuumCard, 
        title: 'Vacuum',
        roomTitle: 'Vacuums'
    },
    'alarm': {
        component: AlarmCard, 
        title: 'Alarm',
        roomTitle: 'Alarms'
    },
    'oven': {
        component: OvenCard, 
        title: 'Oven',
        roomTitle: 'Ovens'
    },
    'door': {
        component: DoorCard, 
        title: 'Door',
        roomTitle: 'Doors'
    },
    'refrigerator': {
        component: FridgeCard, 
        title: 'Fridge',
        roomTitle: 'Fridges'
    },
    'blinds': {
        component: WindowCard, 
        title: 'Blind',
        roomTitle: 'Blinds'
    },
}

export default {
    state: undefined,
    initializeState: async function() {
        this.state = {darkMode: true, types: {}};
        const ans = await DeviceTypeApi.getAll();
        if (ans.result) {
            ans.result.forEach(dt => {
                this.state.types[dt.name] = {
                    id: dt.id,
                    name: dt.name,
                    component: types[dt.name].component,
                    title: types[dt.name].title,
                    roomTitle: types[dt.name].roomTitle
                }
            });
            console.log(this.state.types);
        }
    },
    fetchState: async function() {
        console.log("Fetching state");
        await localStorage.removeItem('intellifox_state');
        let aux = await JSON.parse(localStorage.getItem('intellifox_state'));
        if (!aux) {
          await this.initializeState();
          await this.saveState();
        }
        else
            this.state = aux;
    },
    saveState: async function() {
        await localStorage.setItem('intellifox_state', JSON.stringify(this.state));
        let ans = await JSON.parse(localStorage.getItem('intellifox_state'));
        console.log("Saved");
        console.log(ans);
    },
    setState(newState) {
        this.state = newState;
        this.saveState();
    },
    getState() {
        return this.state;
    },
    setDarkMode(newValue) {
        this.state.darkMode = newValue;
        this.saveState();
    },
    getDarkMode() {
        return this.state.darkMode;
    },
    setActualHome(newValue) {
        this.state.actualHome = newValue;
        this.saveState();
    },
    getActualHome() {
        return this.state.actualHome;
    },
    getTypeId(name) {
        return this.state.types[name].id;
    },
    getTypeTitle(name) {
        return this.state.types[name].title;
    },
    getTypeRoomTitle(name) {
        return this.state.types[name].roomTitle;
    },
    getTypeComponent(name) {
        return this.state.types[name].component;
    },
}