<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard :click=" () => {show = !show}" title="title" subtitle="subtitle" icon="mdi-air-conditioner"></TopCard>
    </div>
    <div class="device_bottom_card" max-width="10">
        <v-expand-transition >
          <div v-show="show">
            <v-divider></v-divider>
              <v-row>
 
                <v-row></v-row>
                <v-btn-toggle
                  v-model="mode"
                  mandatory
                  class="py-5"
                >
                  <v-btn>
                    <v-icon>mdi-snowflake</v-icon>
                  </v-btn>
                  <v-btn>
                    <v-icon>mdi-weather-sunny</v-icon>
                  </v-btn>
                  <v-btn>
                    <v-icon>mdi-fan</v-icon>
                  </v-btn>
                </v-btn-toggle>
                <v-row></v-row>

                <v-row>             
                  <v-col cols="1"></v-col>
                  <v-btn icon x-large class="ma-5" @click="temperature=temperature-1">
                    <v-icon x-large>mdi-chevron-down</v-icon>
                  </v-btn>
                  <h1 class="my-5">{{temperature}}°</h1>
                  <v-btn icon x-large class="ma-5" @click="temperature=temperature+1">
                    <v-icon x-large>mdi-chevron-up</v-icon>
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
    temperature:0,
  }),
};
</script>