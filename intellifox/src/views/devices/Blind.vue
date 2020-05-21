<template>
  <div class="blinds">
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>Blinds</h1>
    </v-row>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <WindowCard class="card"></WindowCard>
        </v-col>
         <v-col cols="6">
          <WindowCard class="card"></WindowCard>
        </v-col>
         <v-col cols="6">
          <WindowCard class="card"></WindowCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import WindowCard from "@/components/devices/WindowCard.vue";
export default {
  components: {
    WindowCard,
  },
};
</script>
