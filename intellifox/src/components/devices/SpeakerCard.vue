<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard :click=" () => {show = !show}" title="title" subtitle="subtitle" icon="mdi-speaker"></TopCard>
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-text>
              I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
            </v-card-text>
          </div>
        </v-expand-transition>
    </div>
  </v-card>
</template>

<script>
import TopCard from "@/components/devices/GenericTopCard.vue";
export default {
  components: {
    TopCard,
  },
  data: () => ({
    show:false,
  }),
};
</script>

<!-- <v-sheet class="top_card"> 
        <span class="device_icon_frame">
          <v-icon>mdi-speaker</v-icon>
        </span>
        <span class="device_info_frame">
          <div class="info_top_frame">
            <span>
              {{speaker-name}}
            </span>
            <span>
              <v-icon>flechita</v-icon>
            </span>
          </div>
          <div class="info_bottom_frame">
            {{playing}}
          </div>
        </span>
        <span class="device_interaction_frame">
          <span class="heart_icon"><v-icon>heart</v-icon></span>
          <span class="play_icon"><v-icon>play</v-icon></span>
          <span class="overflow_icon"><v-icon>july3puntitos</v-icon></span>
        </span>
</v-sheet> -->