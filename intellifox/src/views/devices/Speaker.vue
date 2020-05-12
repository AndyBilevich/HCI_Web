<template>
  <div class="speakers">
    <h1>Speakers</h1>
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
