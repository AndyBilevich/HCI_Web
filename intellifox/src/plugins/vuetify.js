import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        dark: {
          background_fill: '#121212',
          background: '#363636',
          window: '#242424',
          sidebar: '#8A8A8A',
          icon: '#ABABAB',
          text: '#D0D0D0',
          sub_header: '#E2E2E2',
          header: '#EEEEEE',
          primary: '#BB86FC',
          cards: '#E2CDFD',
          error: '#ED483D',
          error_window: '#636363'
        }
      }    
    }
});
