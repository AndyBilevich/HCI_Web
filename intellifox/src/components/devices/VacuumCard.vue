<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard :click=" () => {show = !show}" title="title" subtitle="subtitle" icon="mdi-robot-vacuum"></TopCard>
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            
            <v-row>
 
                <v-row></v-row>
                <v-btn-toggle
                  v-model="mode"
                  mandatory
                  tile
                  class="py-5"
                >
                  <v-btn>
                    <v-icon>mdi-fan</v-icon>
                    vacuum
                  </v-btn>
                  <v-btn>
                    <v-icon>mdi-broom</v-icon>
                    mop
                  </v-btn>
                </v-btn-toggle>
                <v-row></v-row>

                <v-row>             
                  <v-col cols="1"></v-col>
                  <v-btn icon x-large class="ma-5" v-if="!play" @click="play=true">
                    <v-icon x-large>mdi-play</v-icon>
                    start
                  </v-btn>
                  <v-btn icon x-large class="ma-5" v-if="play" @click="play=false">
                    <v-icon x-large>mdi-pause</v-icon>
                    stop
                  </v-btn>
                </v-row>


                <v-row>
                  <v-btn large class="ma-5" color="primary">
                      <v-icon>mdi-power-plug</v-icon>
                      charge
                  </v-btn>
                </v-row>
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
  data: () => ({
    show:false,
    play:false,
  }),
};
</script>