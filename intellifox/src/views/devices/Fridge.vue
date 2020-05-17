<template>
  <div class="fridges">
    <h1>Fridges</h1>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <FridgeCard class="card"></FridgeCard>
        </v-col>
         <v-col cols="6">
          <FridgeCard class="card"></FridgeCard>
        </v-col>
         <v-col cols="6">
          <FridgeCard class="card"></FridgeCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import FridgeCard from "../../components/devices/FridgeCard.vue";
export default {
  components: {
    FridgeCard,
  },
};
</script>
