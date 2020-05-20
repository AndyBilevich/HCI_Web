<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard :click=" () => {show = !show}" title="title" subtitle="subtitle" icon="mdi-air-conditioner"></TopCard>
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
              <v-row>
                <v-btn-toggle
                  v-model="mode"
                  mandatory
                  class="pa-5"
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