<template>
  <div class="devices">
    <h1>Devices</h1>

    <v-row dense>
      <v-col cols="3">
        <router-link :class="miniHidd" class="routerLink" to="/devices/air-conditioners">
          <v-card class="device_card" color="#eeaaFF">
            <v-card-title>
              <span class="headline font-weight-light">Air Conditioners</span>
            </v-card-title>
          </v-card>
        </router-link>
      </v-col>

      <v-col cols="3">
        <router-link :class="miniHidd" class="routerLink" to="/devices/alarms">
          <v-card class="device_card" color="#eebbFF">
            <v-card-title>
              <span class="headline font-weight-light">Alarms</span>
            </v-card-title>
          </v-card>
        </router-link>
      </v-col>

      <v-col cols="3">
        <router-link :class="miniHidd" class="routerLink" to="/devices/awnings">
          <v-card class="device_card" color="#eeccFF">
            <v-card-title>
              <span class="headline font-weight-light">Awnings</span>
            </v-card-title>
          </v-card>
        </router-link>
      </v-col>

      <v-col cols="3">
        <router-link :class="miniHidd" class="routerLink" to="/devices/blinds">
          <v-card class="device_card" color="#eeddFF">
            <v-card-title>
              <span class="headline font-weight-light">Blinds</span>
            </v-card-title>
          </v-card>
        </router-link>
      </v-col>

      <v-col cols="3">
        <router-link :class="miniHidd" class="routerLink" to="/devices/curtains">
          <v-card class="device_card" color="#eeeeFF">
            <v-card-title>
              <span class="headline font-weight-light">Curtains</span>
            </v-card-title>
          </v-card>
        </router-link>
      </v-col>

      <v-col cols="3">
        <router-link :class="miniHidd" class="routerLink" to="/devices/doors">
          <v-card class="device_card" color="#eeffFF">
            <v-card-title>
              <span class="headline font-weight-light">Doors</span>
            </v-card-title>
          </v-card>
        </router-link>
      </v-col>

      <v-col cols="3">
        <router-link :class="miniHidd" class="routerLink" to="/devices/fridges">
          <v-card class="device_card" color="#FFFFFF">
            <v-card-title>
              <span class="headline font-weight-light">Fridges</span>
            </v-card-title>
          </v-card>
        </router-link>
      </v-col>

      <v-col cols="3">
        <router-link :class="miniHidd" class="routerLink" to="/devices/lights">
          <v-card class="device_card" color="#eeffFF">
            <v-card-title>
              <span class="headline font-weight-light">Lights</span>
            </v-card-title>
          </v-card>
        </router-link>
      </v-col>

      <v-col cols="3">
        <router-link :class="miniHidd" class="routerLink" to="/devices/ovens">
          <v-card class="device_card" color="#eeeeFF">
            <v-card-title>
              <span class="headline font-weight-light">Ovens</span>
            </v-card-title>
          </v-card>
        </router-link>
      </v-col>

      <v-col cols="3">
        <router-link :class="miniHidd" class="routerLink" to="/devices/speakers">
          <v-card class="device_card" color="#eeddFF">
            <v-card-title>
              <span class="headline font-weight-light">Speakers</span>
            </v-card-title>
          </v-card>
        </router-link>
      </v-col>

      <v-col cols="3">
        <router-link :class="miniHidd" class="routerLink" to="/devices/sprinklers">
          <v-card class="device_card" color="#eeccFF">
            <v-card-title>
              <span class="headline font-weight-light">Sprinklers</span>
            </v-card-title>
          </v-card>
        </router-link>
      </v-col>

      <v-col cols="3">
        <router-link :class="miniHidd" class="routerLink" to="/devices/taps">
          <v-card class="device_card" color="#eebbFF">
            <v-card-title>
              <span class="headline font-weight-light">Taps</span>
            </v-card-title>
          </v-card>
        </router-link>
      </v-col>

      <v-col cols="3">
        <router-link :class="miniHidd" class="routerLink" to="/devices/vacuums">
          <v-card class="device_card" color="#eeaaFF">
            <v-card-title>
              <span class="headline font-weight-light">Vacuums</span>
            </v-card-title>
          </v-card>
        </router-link>
      </v-col>
    </v-row>

    <router-link class="routerLink" to="/add_device">
      <v-btn color="purple" fab dark big bottom right>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </router-link>
  </div>
</template>


<style>
.device_card {
  text-align: center;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>