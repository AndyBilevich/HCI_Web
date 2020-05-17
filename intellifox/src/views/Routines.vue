<template>
  <div class="routines">
    <h1>Routines</h1>
    <v-row dense>
      <v-col cols="6" v-for="routine in routineList" :key="routine.name">
          <RoutineCard class="card" :name="routine.name" :desc="routine.desc" :color="routine.color"  />
      </v-col>
    </v-row>

    <router-link class="routerLink" to="/add_routine">
      <v-btn class="add_btn" color="primary" fab dark big bottom right>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </router-link>
     
  </div>
</template>


<script>
import RoutineCard from "@/components/RoutineCard.vue";
export default {
  components: {
    RoutineCard
  },
  data: () => ({
      hidden: false,
      routineList: [
        {
          name: 'Let there be light!',
          desc: 'turns on all lights in the hause at max power',
          color: 'yellow'
        },
        {
          name: 'Lockdown Mode',
          desc: 'closes all dors and acivates all alarms',
          color: 'red'
        },
        {
          name: 'Winter is comming',
          desc: 'Turns all all A/C to max freezing',
          color: 'blue'
        },
      ]
    })
  };
</script>

<style>
.card {
  margin: 20;
}
.add_btn {
  position: absolute;
  bottom: 7%;
  left: 88%;
  float: right;
}
</style>

