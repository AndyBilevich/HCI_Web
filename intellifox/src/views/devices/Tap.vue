<template>
  <div class="tap">
    <h1>Taps</h1>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <TapCard class="card"></TapCard>
        </v-col>
         <v-col cols="6">
          <TapCard class="card"></TapCard>
        </v-col>
         <v-col cols="6">
          <TapCard class="card"></TapCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TapCard from "@/components/devices/TapCard.vue";
export default {
  components: {
    TapCard,
  },
};
</script>
