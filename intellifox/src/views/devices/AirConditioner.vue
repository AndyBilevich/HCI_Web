<template>
  <div class="air_conditioners">
    <h1>Air Conditioners</h1>
    <AirConditionerCard></AirConditionerCard>
  </div>
</template>

<script>
import AirConditionerCard from "@/components/devices/AirConditionerCard.vue";
export default {
  components: {
    AirConditionerCard,
  },
};
</script>