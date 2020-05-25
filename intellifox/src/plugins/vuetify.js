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
          background1: '#c9c9c9',
          background2: '#EFEDED',
          background3: '#ded9e0',
          window: '#c8c7c9',
          sidebar: '#757575',
          icon: '#545454',
          text: '#050505',
          sub_header: '#1D1D1D',
          header: '#111111',
          primary: '#8e36f9',
          cards: '#954cba',
          error: '#12B7C2',
        }
      }    
    }
});
