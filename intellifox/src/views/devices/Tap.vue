<template>
  <div class="tap">
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>Taps</h1>
    </v-row>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <TapCard class="card"></TapCard>
        </v-col>
         <v-col cols="6">
          <TapCard class="card"></TapCard>
        </v-col>
         <v-col cols="6">
          <TapCard class="card"></TapCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TapCard from "@/components/devices/TapCard.vue";
export default {
  components: {
    TapCard,
  },
};
</script>
