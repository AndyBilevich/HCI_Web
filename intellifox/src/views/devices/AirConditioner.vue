<template>
  <div class="air_conditioners">
    <h1>Air Conditioner</h1>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <AirConditionerCard class="card"></AirConditionerCard>
        </v-col>
         <v-col cols="6">
          <AirConditionerCard class="card"></AirConditionerCard>
        </v-col>
         <v-col cols="6">
          <AirConditionerCard class="card"></AirConditionerCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AirConditionerCard from "@/components/devices/AirConditionerCard.vue";
export default {
  components: {
    AirConditionerCard,
  },
};
</script>