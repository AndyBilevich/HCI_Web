<template>
  <div class="lights">
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <LightCard class="card"></LightCard>
        </v-col>
         <v-col cols="6">
          <LightCard class="card"></LightCard>
        </v-col>
         <v-col cols="6">
          <LightCard class="card"></LightCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LightCard from "@/components/devices/LightCard.vue";
export default {
  components: {
    LightCard,
  },
};
</script>
