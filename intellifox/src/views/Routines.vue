<template>
  <div class="routines">
    <h1 align="center">Routines</h1>
    <div v-if="routines.length === 0">
      <v-row class="d-flex justify-center">
        <h3 class="noItemsMessage" align="center"> {{noItemsText}} </h3>
      </v-row>
    </div>
    <div v-else>
      <v-row dense>
        <v-col cols="6" v-for="routine in routines" :key="routine.name">
            <RoutineCard @upd="retrieveRoutines" class="card" :id="routine.id"/>
        </v-col>
      </v-row>
    </div>
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
      noItemsText: "",
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
        this.noItemsText = "You don't have routines created yet. Add one with the bottom right button."
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

