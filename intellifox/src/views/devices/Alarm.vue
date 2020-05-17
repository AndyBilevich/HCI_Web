<template>
  <div class="alarms">
    <h1>Alarms</h1>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <AlarmCard class="card"></AlarmCard>
        </v-col>
         <v-col cols="6">
          <AlarmCard class="card"></AlarmCard>
        </v-col>
         <v-col cols="6">
          <AlarmCard class="card"></AlarmCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AlarmCard from "@/components/devices/AlarmCard.vue";
export default {
  components: {
    AlarmCard,
  },
};
</script>
