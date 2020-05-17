<template>
  <div class="awnings">
    <h1>Awnings</h1>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <AwningCards class="card"></AwningCards>
        </v-col>
         <v-col cols="6">
          <AwningCards class="card"></AwningCards>
        </v-col>
         <v-col cols="6">
          <AwningCards class="card"></AwningCards>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AwningCards from "@/components/devices/AwningCard.vue";
export default {
  components: {
    AwningCards,
  },
};
</script>
