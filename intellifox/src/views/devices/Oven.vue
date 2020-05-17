<template>
  <div class="ovens">
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab dark big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>Oven</h1>
    </v-row>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <OvenCard class="card"></OvenCard>
        </v-col>
         <v-col cols="6">
          <OvenCard class="card"></OvenCard>
        </v-col>
         <v-col cols="6">
          <OvenCard class="card"></OvenCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import OvenCard from "@/components/devices/OvenCard.vue";
export default {
  components: {
    OvenCard,
  },
};
</script>
