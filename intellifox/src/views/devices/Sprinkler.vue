<template>
  <div class="sprinklers">
    
    <v-row>
      <router-link class="routerLink" to="/devices">
        <v-btn color="primary" fab dark big bottom text right>
          <v-icon x-large >mdi-keyboard-backspace</v-icon>
        </v-btn>
      </router-link>
      <h1>Sprinklers</h1>
    </v-row>
    
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <SprinklerCard class="card"></SprinklerCard>
        </v-col>
         <v-col cols="6">
          <SprinklerCard class="card"></SprinklerCard>
        </v-col>
         <v-col cols="6">
          <SprinklerCard class="card"></SprinklerCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SprinklerCard from "@/components/devices/SprinklerCard.vue";
export default {
  components: {
    SprinklerCard,
  },
};
</script>
