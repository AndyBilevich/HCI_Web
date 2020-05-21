<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard :click=" () => {show = !show}" title="title" subtitle="subtitle" icon="mdi-fridge-outline"></TopCard>
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
                <v-row>
                  <h3 class="mt-5 ml-5">Freezer temperature:</h3>
                  <v-col cols="6">
                    <v-slider
                      v-model="freezer"
                      class="align-center mr-3"
                      :max="maxf"
                      :min="minf"
                      hide-details 
                    >
                      <template v-slot:append>
                        <v-text-field
                          readonly
                          v-model="freezer"
                          class="mt-0 pt-0"
                          hide-details
                          type="number"
                          style="width: 40px"
                        ></v-text-field>
                      </template>
                    </v-slider>
                  </v-col>
                </v-row>

                <v-row>
                  <h3 class="mt-5 ml-5">Fridge temperature:</h3>
                  <v-col cols="6">
                    <v-slider
                      v-model="fridge"
                      class="align-center"
                      :max="maxr"
                      :min="minr"
                      hide-details 
                    >
                      <template v-slot:append>
                        <v-text-field
                          readonly
                          v-model="fridge"
                          class="mt-0 pt-0"
                          hide-details
                          type="number"
                          style="width: 40px"
                        ></v-text-field>
                      </template>
                    </v-slider>
                  </v-col>

                  <v-row>
                    <v-col cols="2" class="mt-5"></v-col>
                    <h3 class="mt-5 ml-5">Mode:</h3>
                    <v-btn-toggle class="ma-5" tile>
                        <v-btn>
                          party
                        </v-btn>
                        <v-btn>
                          normal
                        </v-btn>
                        <v-btn>
                          vacation
                        </v-btn>
                      </v-btn-toggle>
                      
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
    minr:2,
    maxr:8,
    minf:"-20",
    maxf:"-8",
  }),
};
</script>