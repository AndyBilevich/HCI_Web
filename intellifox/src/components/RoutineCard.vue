<template>
  <div>
    <div class="text-center">
      <v-card color="background1">
        <v-row align="center">
          <v-col cols="2">
            <v-icon size="100" :color="routine.meta.color" >mdi-circle</v-icon>
          </v-col>
          <v-col cols="7">
            <v-row>
              <v-card-title class="headline">
              {{ routine.name }}
              <v-btn icon @click="goToRoutine">
                  <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
              </v-card-title>
            </v-row>
            <v-row>
              <v-card-subtitle>{{ routine.meta.desc }}</v-card-subtitle>
            </v-row>
          </v-col>
          <v-col cols="1" @click="addToFavourites">
            <v-btn v-if="!routine.meta.favourites" text icon>
              <v-icon large>mdi-heart-outline</v-icon>
            </v-btn>
            <v-btn v-else text icon>
              <v-icon large>mdi-heart</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn @click="executeRoutine" text icon>
              <v-icon large>mdi-play</v-icon>
            </v-btn>

            <v-menu close-on-click close-on-content-click absolute>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" text icon>
                  <v-icon large>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-list-item>
                <v-list-item @click="dialog=true">
                    <v-icon>mdi-trash-can</v-icon>Delete
                  </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>

      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card color="background3">
          <v-card-title class="headline">Be careful</v-card-title>

          <v-card-text>
            Are you sure you want to delete this routine? <br/> This action is irreversible.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="window"
              @click="dialog = false"
            >
              Cancel
            </v-btn>

            <v-btn
              color="primary"
              @click="deleteRoutine"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      </v-card>

      <v-snackbar
        v-model="succ_snackbar"
        bottom
        color="primary"
        :timeout="displayTime"
      >
        <h3>Routine executed successfully</h3>
        <v-btn
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>

      <v-snackbar
        v-model="err_snackbar"
        bottom
        color="error"
        :timeout="displayTime"
      >
        <h3>Something went wrong, routine execution failed</h3>
        <v-btn
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import { RoutineApi, Routine } from '@/api';
export default {
  data: function() {
    return {
      displayTime: 5000,
      hidden: false,
      dialog:false,

      routine: { meta: {} },
      succ_snackbar:false,
      err_snackbar:false,
    }
  },
  props: {
    id: String,
  },
  mounted: function() {
    this.retrieveRoutine();
  },
  methods: {
    retrieveRoutine: async function(){
      try {
        const ans = await RoutineApi.get(this.id);
        this.routine = ans.result;  
      } catch (err) {
        console.log(err);
      }
    },
    executeRoutine: async function(){
      try {
        await RoutineApi.execute(this.id);
        this.succ_snackbar = true; 
      } catch (err) {
        this.err_snackbar = true;
        console.log(err);
      }
    },
    addToFavourites: async function(){
      let actions = [];
      this.routine.actions.forEach(r => {
        actions.push({
          device: {
            id: r.device.id,
          },
          actionName: r.actionName,
          params: r.params,
          meta: {},
        })
      })
      const routine = new Routine(
        this.routine.id,
        this.routine.name,
        actions,
        { desc: this.routine.meta.desc,
          color: this.routine.meta.color,
          favourites: this.routine.meta.favourites ? !this.routine.meta.favourites : true }
      );
      //console.log(routine);
      try {        
          await RoutineApi.modify(routine);
          this.routine.meta.favourites = !this.routine.meta.favourites;
      } catch (err) {
          console.log(err);
      }
      
    },
    
    deleteRoutine: async function(){
      try {
        await RoutineApi.delete(this.routine.id);
        this.emitUpdRoutines(); 
      } catch (err) {
        console.log(err);
      }
    },
    emitUpdRoutines: async function(){
      this.$emit('upd');
    },
    goToRoutine: function(){
      router.push({name:"Routine", params:{id: this.routine.id}});
    }
  }
};
</script>