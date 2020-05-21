<template>
  <div class="awnings">
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>Awnings</h1>
    </v-row>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <WindowCards class="card"></WindowCards>
        </v-col>
         <v-col cols="6">
          <WindowCards class="card"></WindowCards>
        </v-col>
         <v-col cols="6">
          <WindowCards class="card"></WindowCards>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import WindowCards from "@/components/devices/WindowCard.vue";
export default {
  components: {
    WindowCards,
  },
};
</script>
