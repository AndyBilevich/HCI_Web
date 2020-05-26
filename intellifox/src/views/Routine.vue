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
            <v-col v-for="d in deviceInfo" :key="d.id" cols="3">
                <v-card>
                    <v-card-title class="headline">
                        <!-- <v-icon> {{types[d.type.name].icon}} </v-icon> -->
                        {{d.name}}
                    </v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item v-for="action in deviceActions[d.id]" :key="action.id">
                                <v-row>
                                    <v-col cols="7">
                                        <h3>
                                            {{action.actionName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}}
                                        </h3>
                                    </v-col>
                                    <v-col cols="5">
                                        <h3 v-for="(param, idx) in action.params" :key="idx">
                                            {{param}}
                                        </h3>
                                    </v-col>
                                </v-row>
                            </v-list-item>
                        </v-list>
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
//import storage from '@/storage';
import router from '@/router';
import { RoutineApi} from '@/api';
    export default {
        data: function() {
            return {
                dialog: false,
                routine: {
                    meta: {}
                },
                allDevActions: [],
                deviceInfo: {},
                types: {},
                deviceActions: {},
            }
        },
        mounted: async function() {
            await this.retrieveRoutine();
        },
        methods: {
            retrieveRoutine: async function() {
                const ans = await RoutineApi.get(this.$route.params.id);
                this.deviceInfo = {};
                this.deviceActions = {};
                //this.types = await storage.getAllTypes();
                //console.log(this.types);
                for(let i = 0; i< ans.result.actions.length; i++){
                    if (!this.deviceActions[ans.result.actions[i].device.id]) {
                        this.deviceInfo[ans.result.actions[i].device.id] = ans.result.actions[i].device;
                        this.deviceActions[ans.result.actions[i].device.id] = [];
                    }
                    this.deviceActions[ans.result.actions[i].device.id].push({
                        actionName: ans.result.actions[i].actionName,
                        meta: ans.result.actions[i].meta,
                        params: ans.result.actions[i].params,
                    });
                }
                console.log(this.deviceActions);
                console.log(this.deviceInfo);
            },
            
            deleteRoutine: async function() {
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
