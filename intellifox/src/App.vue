

<template>
  <v-app :light="!this.$vuetify.theme.dark" :dark="this.$vuetify.theme.dark">
    <v-navigation-drawer
      id="navdrawer"
      :v-model="drawer"
      :mini-variant="miniVar"
      fixed
      clipped
      permanent
      class="window"
    >
      <v-list 
        dense 
      >
        <DrawerItem v-for="item in main_opt" :key="item.index" :icon="item.icon" :text="item.name" :to="item.to"/>
        <v-divider :class="miniHidd"></v-divider>
        <DrawerItem v-for="item in sec_opt" :class="miniHidd" :key="item.index" :icon="item.icon" :text="item.name" :to="item.to"/>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar elevation="0" app clipped-left class="window">
      <v-row align="center">
        <v-col>
          <v-row align="center">
            <v-app-bar-nav-icon
              @click.stop="() => {
                  miniVar = !miniVar
                  if (miniHidd === 'd-none')
                    miniHidd = 'd-flex';
                  else
                    miniHidd = 'd-none';
                }"
            />
            <v-toolbar-title>
              <v-img id="logoweb" src="./assets/logo_web.png" contain></v-img>
            </v-toolbar-title>
            <pre class="font-weight-bold">   >   </pre>
            <h3 v-if="!home.id">No home selected</h3><h3 v-else class="font-weight-bold">{{ home.name }}</h3> 
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-row
      id="screen_cont" 
      @click.stop="() => {
        miniVar = true;
        miniHidd = 'd-none';
      }"
    >
      <v-content align="center">
        <div id="bkg" class="background2">
          <router-view @update_home="updateHome"/>
        </div>
      </v-content>
    </v-row>

    <v-footer id="footer" class="window" absolute>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<style scoped>
.routerLink {
  text-decoration: none;
}

#logoweb {
  margin-left: 20px;
}

#navdrawer {
  margin-top: 55px;
}

#screen_cont {
  height:100%;
}

#bkg {
  margin: auto;
  padding: 20px;
  width: 1300px;
  height: 100%;
}

#footer {
  z-index: 4;
}
</style>

<script>
import storage from '@/storage';
import DrawerItem from '@/components/DrawerItem'
import { HomeApi } from '@/api';
export default {
  props: {
    source: String
  },
  components: {
    DrawerItem,
  },
  data: function() {
    return ({
      drawer: true,
      miniVar: true,
      miniHidd: 'd-none',
      fill: "   >  ",
      main_opt: [
        {
          index: 0,
          name: 'Favourites',
          icon: 'mdi-cards-heart',
          to: {
            path: '/favourites'
          }
        },
        {
          index: 1,
          name: 'Homes',
          icon: 'mdi-home-group',
          to: {
            path: '/homes'
          }
        },
        {
          index: 2,
          name: 'Rooms',
          icon: 'mdi-door',
          to: {
            path: '/rooms'
          }
        },
        {
          index: 3,
          name: 'Devices',
          icon: 'mdi-remote',
          to: {
            path: '/devices'
          }
        },
        {
          index: 4,
          name: 'Routines',
          icon: 'mdi-calendar-clock',
          to: {
            path: '/routines'
          }
        }
      ],
      sec_opt: [
        {
          index: 5,
          name: 'Electrical Cons.',
          icon: 'mdi-lightning-bolt-outline',
          to: {
            path: '/eleccons'
          }
        },
        {
          index: 6,
          name: 'History',
          icon: 'mdi-history',
          to: {
            path: '/history'
          }
        },
        {
          index: 7,
          name: 'Settings',
          icon: 'mdi-cog-outline',
          to: {
            path: '/settings'
          }
        },
        {
          index: 8,
          name: 'Help & Feedback',
          icon: 'mdi-help-circle-outline',
          to: {
            path: '/helpfeed'
          }
        },
        {
          index: 9,
          name: 'Error Log',
          icon: 'mdi-alert-outline',
          to: {
            path: '/errorlog'
          }
        }
      ],
      home: {},
    })
  },
  created: async function() {
    await storage.fetchState();
    this.retrieveTheme();
    this.retrieveHome();
  },
  beforeDestroy: async function() {
    await storage.saveState();
  },
  methods: {
    updateHome: async function(new_id) {
      try {
        const ans = await HomeApi.get(new_id);
        if (ans.result) {
          this.home = ans.result;
          await storage.setActualHome(this.home);
        }
      } catch (err) {
        console.log(err);
      }
    },
    retrieveTheme: async function() {
      let dark = await storage.getDarkMode();
      this.$vuetify.theme.dark = dark;
    },
    retrieveHome: async function() {
      let home = await storage.getActualHome();
      if (home)
        this.updateHome(home.id);
    },
  },
};
</script>