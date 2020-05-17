<template>
  <div class="vacuums">
    <h1>Vacuums</h1>
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

