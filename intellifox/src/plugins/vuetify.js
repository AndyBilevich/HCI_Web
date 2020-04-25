import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        dark: {
          grey900: '#121212',
          greyB: '#363636',
          grey700: '#505050',
          grey600: '#636363',
          grey500: '#8A8A8A',
          grey400: '#ABABAB',
          grey300: '#D0D0D0',
          grey200: '#E2E2E2',
          grey100: '#EEEEEE',
          purple700: '#803BE0',
          purple500: '#994AF1',
          purple300: '#BB86FC',
          purple100: '#E2CDFD',
          red700: '#CC3535',
          red500: '#ED483D',
          red300: '#DF7576',
          red100: '#FCCDD3',
          error: '#b71c1c'
        }
      }    
    }
});
