<template>
  <div class="air_conditioners">
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab dark big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>Air Conditioners</h1>
    </v-row>
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