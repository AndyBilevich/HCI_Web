<template>
  <div class="doors">
    <h1>Doors</h1>
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
