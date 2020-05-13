

<template>
  <v-app id="inspire" :light="!this.$vuetify.theme.dark" :dark="this.$vuetify.theme.dark">
    <v-navigation-drawer
      id="navdrawer"
      :v-model="drawer"
      :mini-variant="miniVar"
      fixed
      clipped
      permanent
      class="window"
    >
      <v-list dense>
        <router-link class="routerLink" to="/favourites">
          <v-list-item link>
            <v-list-item-action>
              <v-icon class="icon--text">mdi-cards-heart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="icon--text">Favourites</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link class="routerLink" to="/homes">
          <v-list-item link>
            <v-list-item-action>
              <v-icon class="icon--text">mdi-home-group</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="icon--text">Homes</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link class="routerLink" to="/rooms">
          <v-list-item link>
            <v-list-item-action>
              <v-icon class="icon--text">mdi-door</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="icon--text">Rooms</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link class="routerLink" to="/devices">
          <v-list-item link>
            <v-list-item-action>
              <v-icon class="icon--text">mdi-remote</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="icon--text">Devices</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link class="routerLink" to="/routines">
          <v-list-item link>
            <v-list-item-action>
              <v-icon class="icon--text">mdi-calendar-clock</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="icon--text">Routines</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-divider :class="miniHidd"></v-divider>
        <router-link :class="miniHidd" class="routerLink" to="/eleccons">
          <v-list-item link>
            <v-list-item-action>
              <v-icon class="icon--text">mdi-lightning-bolt-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="icon--text">Electrical Cons.</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link :class="miniHidd" class="routerLink" to="/history">
          <v-list-item link>
            <v-list-item-action>
              <v-icon class="icon--text">mdi-history</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="icon--text">History</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link :class="miniHidd" class="routerLink" to="/settings">
          <v-list-item link>
            <v-list-item-action>
              <v-icon class="icon--text">mdi-cog-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="icon--text">Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link :class="miniHidd" class="routerLink" to="/helpfeed">
          <v-list-item link>
            <v-list-item-action>
              <v-icon class="icon--text">mdi-help-circle-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="icon--text">Help and Feed</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link :class="miniHidd" class="routerLink" to="/errorlog">
          <v-list-item link>
            <v-list-item-action>
              <v-icon class="icon--text">mdi-alert-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="icon--text">Error Log</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar elevation="0" app clipped-left class="window">
      <v-row align="center" justify="center">
        <v-col>
          <v-row align="center" justify="left">
            <v-app-bar-nav-icon
              @click.stop="() => {
                  miniVar = !miniVar
                    if (miniHidd === 'd-none')
                      miniHidd = 'd-flex'
                    else
                      miniHidd = 'd-none'
                }"
            />
            <v-toolbar-title>
              <v-img id="logoweb" src="./assets/logo_web.png" contain></v-img>
            </v-toolbar-title>
          </v-row>
        </v-col>
        <v-col align="center" justify="left">
          <v-text-field
            placeholder="Search..."
            clearable
            solo
            append-icon="mdi-magnify"
            hide-details
          />
        </v-col>
        <v-col />
      </v-row>
    </v-app-bar>

    <v-content align="center">
      <div id="bkg" class="background">
        <router-view />
      </div>
    </v-content>

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

#bkg {
  margin: auto;
  padding: 20px;
  width: 1300px;
  height: 100%;
}
</style>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    miniVar: true,
    miniHidd: "d-none",
    drawer: true
  }),
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

         <!-- 
            https://cdn.materialdesignicons.com/5.1.45/

            mdi-lightbulb
            mdi-lightbulb-on

            mdi-lightbulb-outline
            mdi-lightbulb-on-outline

            mdi-speaker
            mdi-speaker-wireless

            mdi-air-conditioner

            mdi-washing-machine

            mdi-alarm-light
            mdi-alarm-light-outline

            mdi-blinds-open
            mdi-blinds


          -->    