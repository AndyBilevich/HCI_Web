<template> 
  <v-card class="device_card">
    <div class="device_top_card">
        <TopCard :click=" () => {show = !show}" title="title" subtitle="subtitle" icon="mdi-water-pump"></TopCard>
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-col>
              <v-row></v-row>
              
                  <v-btn x-large class="ma-5" color="primary" v-if="open" @click="open=false">
                      <v-icon>mdi-water-off</v-icon>
                      Close
                  </v-btn>
                  <v-btn x-large class="ma-5" color="primary" v-if="!open" @click="open=true">
                      <v-icon>mdi-water</v-icon>
                      Open
                  </v-btn>
              

              <v-col>
                  <v-row> 
                  <h3 class="ml-5" >Dispence:</h3>
                    
                      <v-col cols="4">
                        <v-text-field
                          class="mb-5"
                          label="How many?"
                        ></v-text-field>
                      </v-col>
                  
                      <v-btn-toggle class="ml-5 mt-4" tile>
                        <v-btn>
                          ml
                        </v-btn>
                        <v-btn>
                          cl
                        </v-btn>
                        <v-btn>
                          dl
                        </v-btn>
                        <v-btn>
                          l
                        </v-btn>
                      </v-btn-toggle>
                  </v-row>
                
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
  data: () => ({
    show:false,
    open:false,
  }),
};
</script>