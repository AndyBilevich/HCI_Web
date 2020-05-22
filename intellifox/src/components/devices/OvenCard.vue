<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard :click=" () => {show = !show}" title="title" subtitle="subtitle" icon="mdi-toaster-oven"></TopCard>
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-col>   
              <v-row>
                <v-col cols="2"></v-col>
                <h3 class="mt-3">Temperature:</h3>
                <v-col cols="1"></v-col>
                <v-btn icon x-large @click="temperature = (temperature == 90 ? temperature : temperature-10)">
                  <v-icon x-large>mdi-chevron-down</v-icon>
                </v-btn>
                <h1>{{temperature}}°</h1>
                <v-btn icon x-large @click="temperature = (temperature == 230 ? temperature : temperature+10)">
                  <v-icon x-large>mdi-chevron-up</v-icon>
                </v-btn>
              </v-row>

              <v-col> 
                <h3 align="left" class="mx-5 mt-5">Heat source:</h3>
                <v-btn-toggle
                  v-model="heat"
                  mandatory
                  tile
                  class="mt-5"
                >
                  <v-btn width="160">
                    above
                  </v-btn>
                  <v-btn width="160">
                    below
                  </v-btn>
                  <v-btn width="160">
                    conventional
                  </v-btn>
                </v-btn-toggle>
              </v-col>

              <v-col> 
                <h3 align="left" class="mx-5 mt-5">Grill mode:</h3>
                <v-btn-toggle
                  v-model="grill"
                  mandatory
                  tile
                  class="mt-5"
                >
                  <v-btn width="160">
                    Off
                  </v-btn>
                  <v-btn width="160">
                    complete
                  </v-btn>
                  <v-btn width="160">
                    economic
                  </v-btn>
                </v-btn-toggle>
              </v-col>

              <v-col> 
                <h3 align="left" class="mx-5 mt-5">Convection mode:</h3>
                <v-btn-toggle
                  v-model="convection"
                  mandatory
                  tile
                  class="mt-5"
                >
                  <v-btn width="160">
                    Off
                  </v-btn>
                  <v-btn width="160">
                    conventional
                  </v-btn>
                  <v-btn width="160">
                    economic
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
      temperature:90,
    }
  },
};
</script>