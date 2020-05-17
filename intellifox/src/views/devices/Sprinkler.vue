<template>
  <div class="sprinklers">
    <h1>Sprinklers</h1>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <SprinklerCard class="card"></SprinklerCard>
        </v-col>
         <v-col cols="6">
          <SprinklerCard class="card"></SprinklerCard>
        </v-col>
         <v-col cols="6">
          <SprinklerCard class="card"></SprinklerCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SprinklerCard from "@/components/devices/SprinklerCard.vue";
export default {
  components: {
    SprinklerCard,
  },
};
</script>
