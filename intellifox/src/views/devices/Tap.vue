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
          <WaterCard class="card"></WaterCard>
        </v-col>
         <v-col cols="6">
          <WaterCard class="card"></WaterCard>
        </v-col>
         <v-col cols="6">
          <WaterCard class="card"></WaterCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import WaterCard from "@/components/devices/WaterCard.vue";
export default {
  components: {
   WaterCard,
  },
};
</script>
