import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        dark: {
          background1: '#121212',
          background2: '#363636',
          background3: '#636363',
          window: '#242424',
          sidebar: '#8A8A8A',
          icon: '#ABABAB',
          text: '#D0D0D0',
          sub_header: '#E2E2E2',
          header: '#EEEEEE',
          primary: '#BB86FC',
          cards: '#E2CDFD',
          error: '#ED483D',
        },
        light: {
          background1: '#EDEDED',
          background2: '#C9C9C9',
          background3: '#9C9C9C',
          window: '#DBDBDB',
          sidebar: '#757575',
          icon: '#545454',
          text: '#2F2F2F',
          sub_header: '#1D1D1D',
          header: '#111111',
          primary: '#8e36f9',
          cards: '#801dff',
          error: '#12B7C2',
        }
      }    
    }
});
