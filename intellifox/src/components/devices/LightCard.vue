<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard :click=" () => {show = !show}" title="title" subtitle="subtitle" icon="mdi-lightbulb-outline"></TopCard>
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            
              <h3 class="ml-5 mt-4" align="left">Choose color and intensity:</h3>
              <v-row>
                <v-col cols="2"></v-col>
                <v-color-picker class="ma-5 background1" hide-inputs></v-color-picker>
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
  }),
};
</script>
