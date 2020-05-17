<template>
  <div class="vacuums">
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>Vacuums</h1>
    </v-row>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <VacuumCard class="card"></VacuumCard>
        </v-col>
         <v-col cols="6">
          <VacuumCard class="card"></VacuumCard>
        </v-col>
         <v-col cols="6">
          <VacuumCard class="card"></VacuumCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import VacuumCard from "@/components/devices/VacuumCard.vue";
export default {
  components: {
    VacuumCard,
  },
};
</script>

