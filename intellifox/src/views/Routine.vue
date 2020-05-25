<template>
    <div class="room">
        <v-row>
            <v-col cols="11">
                <v-row>
                    <router-link class="routerLink" to="/routines">
                        <v-btn color="primary" fab big bottom text right>
                            <v-icon x-large >mdi-keyboard-backspace</v-icon>
                        </v-btn>
                    </router-link>
                    <h1>{{routine.name}}</h1>
                </v-row>
            </v-col>
            <v-col cols="1">
                <v-menu close-on-click close-on-content-click class="menu">
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" text icon>
                            <v-icon large color="text">mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click="editRoom">
                            <v-btn text>
                                <v-icon>mdi-pencil</v-icon>
                                Edit
                            </v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-btn
                            text
                            @click="dialog = true"
                            >
                                <div>
                                    <v-icon>mdi-trash-can</v-icon>
                                    Delete
                                </div>
                            </v-btn>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="deviceAction in routine.actions" :key="deviceAction.id" cols="3">
                <v-card>
                    <v-card-title class="headline">
                        {{deviceAction.device.name}}
                    </v-card-title>
                    <v-card-text>
                        {{deviceAction.actionName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase() )}}: <span v-for="p in deviceAction.params" :key="p.id">{{p}} </span>
                    </v-card-text>
                </v-card>
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

    </div>
</template>

<script>

import router from '@/router';
import { RoutineApi } from '@/api';
    export default {
        data: function() {
            return {
                dialog: false,
                routine: {
                    meta: {}
                },
                allDevActions: [],
            }
        },
        mounted: async function() {
            await this.retrieveRoutine();
        },
        methods: {
            retrieveRoutine: async function() {
                const ans = await RoutineApi.get(this.$route.params.id);
                this.routine = ans.result;
            },
            deleteRoutine: async function(){
                try {
                await RoutineApi.delete(this.routine.id);
                this.emitUpdRoutines(); 
                } catch (err) {
                console.log(err);
                }
                router.go(-1);
            },
        }
    }
</script>
