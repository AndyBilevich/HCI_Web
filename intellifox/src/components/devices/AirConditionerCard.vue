<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard :click=" () => {show = !show}" title="title" subtitle="subtitle" icon="mdi-air-conditioner"></TopCard>
    </div>
    <div class="device_bottom_card" max-width="10">
        <v-expand-transition >
          <div v-show="show">
            <v-divider></v-divider>
              <v-col>
                <v-row>
                  <v-col cols="2"></v-col>
                  <h3 class="mt-3">Temperature:</h3>
                  <v-col cols="1"></v-col>
                      <v-btn icon x-large @click="temperature= (temperature == 18 ? temperature : temperature-1)">
                        <v-icon x-large>mdi-chevron-down</v-icon>
                      </v-btn>
                      <h1>{{temperature}}°</h1>
                      <v-btn icon x-large @click="temperature= (temperature == 38 ? temperature : temperature+1)">
                        <v-icon x-large>mdi-chevron-up</v-icon>
                      </v-btn>
                </v-row>

                <v-col> 
                  <h3 align="left" class="mt-5">Mode:</h3>
                  <v-btn-toggle
                    v-model="mode"
                    mandatory
                    tile
                  >
                    <v-btn width="160">
                      <v-icon>mdi-snowflake</v-icon>
                      Cool
                    </v-btn>
                    <v-btn width="160">
                      <v-icon>mdi-weather-sunny</v-icon>
                      Heat
                    </v-btn>
                    <v-btn width="160">
                      <v-icon>mdi-fan</v-icon>
                      Ventilation
                    </v-btn>
                  </v-btn-toggle>
                </v-col>

                <v-col> 
                  <h3 align="left" class="mt-5">Vertical blades rotation:</h3>
                  <v-btn-toggle
                    v-model="vertical"
                    mandatory
                    tile
                  >
                    <v-btn width="70">
                      Auto
                    </v-btn>
                    <v-btn width="70">
                      22°
                    </v-btn>
                    <v-btn width="70">
                      45°
                    </v-btn>
                    <v-btn width="70">
                      67°
                    </v-btn>
                    <v-btn width="70">
                      90°
                    </v-btn>
                  </v-btn-toggle>
                </v-col>

                <v-col> 
                  <h3 align="left" class="mt-5">Horizontal blades rotation:</h3>
                  <v-btn-toggle
                    v-model="horizontal"
                    mandatory
                    tile
                  >
                    <v-btn width="70">
                      Auto
                    </v-btn>
                    <v-btn width="70">
                      -90°
                    </v-btn>
                    <v-btn width="70">
                      -45°
                    </v-btn>
                    <v-btn width="70">
                      0°
                    </v-btn>
                    <v-btn width="70">
                      45°
                    </v-btn>
                    <v-btn width="70">
                      90°
                    </v-btn>
                  </v-btn-toggle>
                </v-col>

                <v-col> 
                  <h3 align="left" class="mt-5">Fan speed:</h3>
                  <v-btn-toggle
                    v-model="fan"
                    mandatory
                    tile
                  >
                    <v-btn width="70">
                      Auto
                    </v-btn>
                    <v-btn width="70">
                      25%
                    </v-btn>
                    <v-btn width="70">
                      50%
                    </v-btn>
                    <v-btn width="70">
                      75%
                    </v-btn>
                    <v-btn width="70">
                      100%
                    </v-btn>
                  </v-btn-toggle>
                </v-col>

              </v-col>
             
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
      temperature:18,
    }
  },
};
</script>