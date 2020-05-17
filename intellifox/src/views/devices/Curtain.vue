<template>
  <div class="cutains">
    <h1>Cutains</h1>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <CurtainCard class="card"></CurtainCard>
        </v-col>
         <v-col cols="6">
          <CurtainCard class="card"></CurtainCard>
        </v-col>
         <v-col cols="6">
          <CurtainCard class="card"></CurtainCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CurtainCard from "@/components/devices/CurtainCard.vue";
export default {
  components: {
    CurtainCard,
  },
};
</script>
