<template>
  <div class="speakers">
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab dark big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>Speakers</h1>
    </v-row>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <SpeakerCard class="card"></SpeakerCard>
        </v-col>
        <v-col cols="6">
          <SpeakerCard class="card"></SpeakerCard>
        </v-col>
        <v-col cols="6">
          <SpeakerCard class="card"></SpeakerCard>
        </v-col>
        <v-col cols="6">
          <SpeakerCard class="card"></SpeakerCard>
        </v-col>
        <v-col cols="6">
          <SpeakerCard class="card"></SpeakerCard>
        </v-col>
        <v-col cols="6">
          <SpeakerCard class="card"></SpeakerCard>
        </v-col>
        <v-col cols="6">
          <SpeakerCard class="card"></SpeakerCard>
        </v-col>
        <v-col cols="6">
          <SpeakerCard class="card"></SpeakerCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SpeakerCard from "@/components/devices/SpeakerCard.vue";
export default {
  components: {
    SpeakerCard
  }
};
</script>

<style>
.card {
  margin: 20;
}
</style>
