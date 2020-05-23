<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard 
        @set_switch_state="switchOnOff"
        :model="door"
        :switchState="switchState"
        :switchLoads="switchLoading"
        :switchLocked="switchLocked"
        :click="() => {show = !show}" 
        :title="title" 
        :subtitle="desc" 
        icon="mdi-speaker"
      />
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-row>  

              <v-col class="ml-5">
                <v-row>
                  <v-slider
                    readonly
                  ></v-slider>
                </v-row>

                <v-row>            
                    <v-col cols="1"></v-col>
                    <v-btn icon x-large class="my-5">
                      <v-icon x-large>mdi-skip-previous</v-icon>
                    </v-btn>
                    <v-btn icon x-large class="ma-5" v-if="!play" @click="play=true">
                      <v-icon x-large>mdi-play</v-icon>
                    </v-btn>
                    <v-btn icon x-large class="ma-5" v-if="play" @click="play=false">
                      <v-icon x-large>mdi-pause</v-icon>
                    </v-btn>
                    <v-btn icon x-large class="my-5">
                      <v-icon x-large>mdi-skip-next</v-icon>
                    </v-btn>
                </v-row>
              </v-col>

              <v-col cols="5">
                  <v-row class="ml-5">         
                    <v-col cols="1"></v-col>
                    <v-btn icon>
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <p class="mt-1">Volume</p>
                    <v-btn icon>
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                  </v-row>
                    <v-slider
                      v-model="media"
                      vertical
                      value="100"
                      class="mr-3"
                    ></v-slider>
                </v-col>
                
            </v-row>

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
   data: function() {
    return {
      show:false,
      play:false,
    }
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