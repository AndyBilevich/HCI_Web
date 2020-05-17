<template>
  <div class="doors">
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab dark big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>Doors</h1>
    </v-row>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <DoorCard class="card"></DoorCard>
        </v-col>
         <v-col cols="6">
          <DoorCard class="card"></DoorCard>
        </v-col>
         <v-col cols="6">
          <DoorCard class="card"></DoorCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DoorCard from "@/components/devices/DoorCard.vue";
export default {
  components: {
    DoorCard,
  },
};
</script>
