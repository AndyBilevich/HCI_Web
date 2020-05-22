<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard :click=" () => {show = !show}" :title="title" :subtitle="desc" icon="mdi-door"></TopCard>
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
  props: {
    model: Object,
  },
  components: {
    TopCard,
  },
  mounted: function() {
    this.door = this.model;
    this.updateTitle();
    this.updateDesc();
    console.log(this.door)
  },
  data: function() {
    return {
      show:false,
      locked:false,
      door: {},
      title: '',
      desc: '',
    }
  },
  methods: {
    updateTitle: function() {
      this.title = this.door.name;
    },
    updateDesc: function() {
      this.desc = `${(this.door.state.status === 'opened')? 'Opened':`Closed - ${(this.door.state.lock == 'blocked')?'Blocked':'Unblocked'}`}`;
    }
  }
};
</script>