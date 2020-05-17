<template>
  <div class="blinds">
    <h1>Blinds</h1>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <BlindCard class="card"></BlindCard>
        </v-col>
         <v-col cols="6">
          <BlindCard class="card"></BlindCard>
        </v-col>
         <v-col cols="6">
          <BlindCard class="card"></BlindCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import BlindCard from "@/components/devices/BlindCard.vue";
export default {
  components: {
    BlindCard,
  },
};
</script>
