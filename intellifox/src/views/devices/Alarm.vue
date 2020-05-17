<template>
  <div class="alarms">
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>Alarms</h1>
    </v-row>
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
