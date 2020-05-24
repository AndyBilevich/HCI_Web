import { DeviceTypeApi } from '@/api';

const types = {
    'speaker': {
        title: 'Speaker',
        icon: 'mdi-speaker'
    },
    'faucet': {
        title: 'Tap',
        icon: 'mdi-water-pump'
    },
    'ac': {
        title: 'Air Conditioner',
        icon: 'mdi-air-conditioner'
    },
    'lamp': {
        title: 'Light',
        icon: 'mdi-lightbulb-on-outline'
    },
    'vacuum': {
        title: 'Vacuum',
        icon: 'mdi-robot-vacuum'
    },
    'alarm': {
        title: 'Alarm',
        icon: 'mdi-alarm-light-outline'
    },
    'oven': {
        title: 'Oven',
        icon: 'mdi-toaster-oven'
    },
    'door': {
        title: 'Door',
        icon: 'mdi-door'
    },
    'refrigerator': {
        title: 'Fridge',
        icon: 'mdi-fridge-outline'
    },
    'blinds': {
        title: 'Blind',
        icon: 'mdi-blinds'
    }
}

export default {
    state: undefined,
    initializeState: async function() {
        this.state = {darkMode: true, types: {}};
        await this.fetchTypes();
    },
    fetchTypes: async function() {
        try {
            const ans = await DeviceTypeApi.getAll();
            this.state.typesByName = {};
            if (ans.result) {
                ans.result.forEach(dt => {
                    this.state.typesByName[dt.name] = {
                        id: dt.id,
                        name: dt.name,
                        icon: types[dt.name].icon,
                        title: types[dt.name].title,
                    }
                });
            }
            //console.log(this.state.typesByName);
        } catch (err) {
            console.log(err);
        }
    },
    fetchState: async function() {
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
        return this.state.actualHome;
    },
    getTypeId: async function(name) {
        if (!this.state)
            await this.fetchState();
        if (!this.state.typesByName)
            await this.fetchTypes();
        return this.state.typesByName[name].id;
    },
    getTypeTitle: async function(name) {
        if (!this.state)
            await this.fetchState();
        if (!this.state.typesByName)
            await this.fetchTypes();
        //console.log("Entre");
        return this.state.typesByName[name].title;
    },
    getAllTypes: async function() {
        if (!this.state)
            await this.fetchState();
        if (!this.state.typesByName)
            await this.fetchTypes();
        return this.state.typesByName;        
    }
}