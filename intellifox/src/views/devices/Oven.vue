<template>
  <div class="ovens">
    <h1>Ovens</h1>
    <OvenCard></OvenCard>
  </div>
</template>

<script>
import OvenCard from "@/components/devices/OvenCard.vue";
export default {
  components: {
    OvenCard,
  },
};
</script>
