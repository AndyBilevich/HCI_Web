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
   data: function() {
    return {
      show:false,
      play:false,
    }
  },
};
</script>