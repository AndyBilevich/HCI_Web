/*
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
        component: 'SpeakerCard', 
        title: 'Speaker',
        roomTitle: 'Speakers'
    },
    'faucet': {
        component: 'WaterCard',
        title: 'Tap',
        roomTitle: 'Taps'
    },
    'ac': {
        component: 'AirConditionerCard',
        title: 'Air Conditioner',
        roomTitle: 'Air Conditioners'
    },
    'lamp': {
        component: 'LightCard', 
        title: 'Light',
        roomTitle: 'Lights'
    },
    'vacuum': {
        component: 'VacuumCard', 
        title: 'Vacuum',
        roomTitle: 'Vacuums'
    },
    'alarm': {
        component: 'AlarmCard', 
        title: 'Alarm',
        roomTitle: 'Alarms'
    },
    'oven': {
        component: 'OvenCard', 
        title: 'Oven',
        roomTitle: 'Ovens'
    },
    'door': {
        component: 'DoorCard', 
        title: 'Door',
        roomTitle: 'Doors'
    },
    'refrigerator': {
        component: 'FridgeCard', 
        title: 'Fridge',
        roomTitle: 'Fridges'
    },    'blinds': {
        component: 'WindowCard', 
        title: 'Blind',
        roomTitle: 'Blinds'
    },
}
*/

export default {
    state: undefined,
    initializeState: async function () {
        this.state = { darkMode: true, types: {} };
    },
    fetchState: async function () {
        console.log("Fetching state");
        //await localStorage.removeItem('intellifox_state');
        let aux = await JSON.parse(localStorage.getItem('intellifox_state'));
        if (!aux) {
            await this.initializeState();
            await this.saveState();
        }
        else
            this.state = aux;
    },
    saveState: async function () {
        await localStorage.setItem('intellifox_state', JSON.stringify(this.state));
    },
    setState(newState) {
        this.state = newState;
        this.saveState();
    },
    getState: async function () {
        if (!this.state)
            await this.fetchState();
        return this.state;
    },
    setDarkMode(newValue) {
        this.state.darkMode = newValue;
        this.saveState();
    },
    getDarkMode: async function () {
        if (!this.state)
            await this.fetchState();
        return this.state.darkMode;
    },
    setActualHome(newValue) {
        this.state.actualHome = newValue;
        this.saveState();
    },
    getActualHome: async function () {
        if (!this.state)
            await this.fetchState();
        console.log(this.state.actualHome)
        return this.state.actualHome;
    },
}