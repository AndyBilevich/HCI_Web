<template>
  <div class="routines">
    <h1>Routines</h1>
    <v-row dense>
      <v-col cols="6" v-for="routine in routines" :key="routine.name">
          <RoutineCard @upd="retrieveRoutines" class="card" :id="routine.id"/>
      </v-col>
    </v-row>

    <router-link class="routerLink" to="/routines/add">
      <v-btn class="add_btn" color="primary" fab big bottom right>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </router-link>
     
  </div>
</template>


<script>
import RoutineCard from "@/components/RoutineCard.vue";
import { RoutineApi } from '@/api';
export default {
  components: {
    RoutineCard
  },
  data: function() {
    return {
      hidden: false,
      routines: []
    }
  },
  mounted: function() {
    this.retrieveRoutines();
  },
  methods: {
    retrieveRoutines: async function(){
        const ans = await RoutineApi.getAll();
        this.routines = ans.result;
    },
  },
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

