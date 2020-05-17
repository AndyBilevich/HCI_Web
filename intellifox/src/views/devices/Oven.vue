<template>
  <div class="ovens">
    <h1>Ovens</h1>
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
