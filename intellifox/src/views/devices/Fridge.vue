<template>
  <div class="fridges">
    <h1>Fridges</h1>
    <FridgeCard></FridgeCard>
  </div>
</template>

<script>
import FridgeCard from "../../components/devices/FridgeCard.vue";
export default {
  components: {
    FridgeCard,
  },
};
</script>
