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
              </v-card-title>
            </v-row>
            <v-row>
              <v-card-subtitle>{{ routine.meta.desc }}</v-card-subtitle>
            </v-row>
          </v-col>
          <v-col cols="3">
            <v-btn text icon large v-if="fav" @click="fav=false">
              <v-icon large>mdi-heart</v-icon>
            </v-btn>
            <v-btn text icon v-if="!fav" @click="fav=true">
              <v-icon large>mdi-heart-outline</v-icon>
            </v-btn>
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
    </div>
  </div>
</template>

<script>
import { RoutineApi } from '@/api';
export default {
  data: function() {
    return {
      hidden: false,
      dialog:false,
      fav:false,
      routine: { meta: {} }, 
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
      const ans = await RoutineApi.get(this.id);
      this.routine = ans.result; 
    },
    executeRoutine: async function(){
      await RoutineApi.execute(this.id);
    },
    deleteRoutine: async function(){
        await RoutineApi.delete(this.routine.id);
        this.emitUpdRoutines();
    },
    emitUpdRoutines: async function(){
      this.$emit('upd');
    }
  }
};
</script>