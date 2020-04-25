  
<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cards-heart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Favourites</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Homes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-img src="./assets/roomslogo.png" contain height="30px" ></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Rooms</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-img src="./assets/deviceslogo.png" contain height="30px" ></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Devices</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-img src="./assets/routineslogo.png" contain height="30px" ></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Routines</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-app-bar
      app
      clipped-left
    >
      <v-row align="center" justify="center">
          <v-col>
            <v-row align="center" justify="left">
              <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
              <v-toolbar-title>
                <v-img src="./assets/logo_web.png" contain></v-img>
              </v-toolbar-title>
            </v-row>
          </v-col>
          <v-col align="center" justify="left">
            <v-text-field
              placeholder="Search..."
              solo
              clearable
              append-icon="mdi-magnify"
              color="white"
              hide-details
            />
          </v-col>
          <v-col/>
      </v-row>
    </v-app-bar>

    <v-card width="60">
    <v-toolbar flat color="primary" dark>
    <v-toolbar-title>User Profile</v-toolbar-title>
          </v-toolbar>
          <v-tabs vertical>
        <v-tab>
          <v-icon left>mdi-account</v-icon>
        </v-tab>
        <v-tab>
          <v-icon left>mdi-lock</v-icon>
        </v-tab>
        <v-tab>
          <v-icon left>mdi-access-point</v-icon>
        </v-tab>
        <v-tab>
          <v-icon left>mdi-access-point</v-icon>
        </v-tab>
        <v-tab>
          <v-icon left>mdi-access-point</v-icon>
        </v-tab>

      </v-tabs>
    </v-card>

    <v-content align="center">
    
      <router-view/>
      
    </v-content>
  

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>