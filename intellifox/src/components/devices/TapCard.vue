<template> 
  <div class="device_card">
    <div class="device_top_card">
        <TopCard title="title" subtitle="subtitle" icon="mdi-water-pump"></TopCard>
    </div>
    <div class="device_bottom_card">
    </div>
  </div>
</template>

<script>
import TopCard from "@/components/devices/GenericTopCard.vue";
export default {
  components: {
    TopCard,
  },
};
</script>