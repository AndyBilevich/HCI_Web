<template>
  <div class="alarms">
    <h1>Alarms</h1>
    <AlarmCard></AlarmCard>
  </div>
</template>

<script>
import AlarmCard from "@/components/devices/AlarmCard.vue";
export default {
  components: {
    AlarmCard,
  },
};
</script>
