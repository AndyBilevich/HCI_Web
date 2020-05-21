<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard :click=" () => {show = !show}" title="title" subtitle="subtitle" icon="mdi-door"></TopCard>
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-btn x-large class="my-5" color="primary" v-if="locked" @click="locked=false">
                    <v-icon class="ma-1">mdi-lock-open-variant</v-icon>
                    Unlock
                  </v-btn>
                  <v-btn x-large class="my-5" color="primary" v-if="!locked" @click="locked=true">
                    <v-icon class="ma-1">mdi-lock</v-icon>
                    Lock
                  </v-btn>
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
    locked:false,
  }),
};
</script>