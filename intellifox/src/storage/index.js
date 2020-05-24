export default {
    state: undefined,
    fetchState: async function() {
        console.log("Fetching state");
        let aux = await JSON.parse(localStorage.getItem('intellifox_state'));
        if (!aux) {
          this.state = {};
          this.state.darkMode = true;
        }
        else
            this.state = aux;
        await this.saveState();
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
    }
}