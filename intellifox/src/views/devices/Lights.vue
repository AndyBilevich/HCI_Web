<template>
  <div class="lights">
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>Lights</h1>
    </v-row>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <LightCard class="card"></LightCard>
        </v-col>
         <v-col cols="6">
          <LightCard class="card"></LightCard>
        </v-col>
         <v-col cols="6">
          <LightCard class="card"></LightCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LightCard from "@/components/devices/LightCard.vue";
export default {
  components: {
    LightCard,
  },
};
</script>
