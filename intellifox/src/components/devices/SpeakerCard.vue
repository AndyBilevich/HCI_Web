<template> 
  <TopCard title="title" subtitle="subtitle" icon="mdi-speaker"></TopCard>
</template>

<script>
import TopCard from "@/components/devices/GenericTopCard.vue";
export default {
  components: {
    TopCard,
  },
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