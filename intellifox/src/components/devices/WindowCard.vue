<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard :click=" () => {show = !show}" title="title" subtitle="subtitle" icon="mdi-blinds"></TopCard>
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-row>
                
                <v-col cols="1"></v-col>
                
                  <v-btn max-width="60" class="mx-5 mt-5" color="primary" v-if="open" @click="open=false">
                    Close
                  </v-btn>
                  <v-btn max-width="60" class="mx-5 mt-5" color="primary" v-if="!open" @click="open=true">
                    Open
                  </v-btn>
                
                <v-col cols="1"></v-col>
                
                <v-row>
                  <h3 class="mt-5">Regulate</h3>
                  <v-col cols="10">
                    <v-slider
                      v-model="slider"
                      class="align-center"
                      :max="max"
                      :min="min"
                      hide-details 
                    >
                      <template v-slot:append>
                        <v-text-field
                          readonly
                          v-model="slider"
                          class="mt-0 pt-0"
                          hide-details
                          type="number"
                          style="width: 40px"
                         
                        ></v-text-field>
                      </template>
                    </v-slider>
                  </v-col>
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
      open:false,
    }
  },
};
</script>