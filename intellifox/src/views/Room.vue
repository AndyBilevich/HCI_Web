<template>
    <div class="room">
        <v-row>
            <v-col cols="1">
                <router-link class="routerLink" to="/rooms">
                    <v-btn color="primary" fab big bottom text right>
                        <v-icon x-large >mdi-keyboard-backspace</v-icon>
                    </v-btn>
                </router-link>
            </v-col>
            <v-col cols="10">
                <h1>{{room.name}}</h1>
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

        <v-dialog
            v-model="dialog"
            max-width="290"
        >
            <v-card color="background3">
                <v-card-title class="headline">Be careful</v-card-title>

                <v-card-text>
                    Are you sure you want to delete this room? <br/> This action is irreversible.
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
                    color="error"
                    @click="() => {
                        dialog = false
                        deleteRoom();
                    }"
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
import { RoomApi } from '@/api';
    export default {
        data: () => ({
            dialog: false,
            room: {
                meta: {}
            }
        }),
        mounted: function() {
            this.room.id = this.$route.params.id
            this.retrieveRoom(this.room.id);
        },
        methods: {
            retrieveRoom: async function() {
                const ans = await RoomApi.get(this.room.id);
                this.room = ans.result;
            },
            deleteRoom: async function() {
                try {
                    await RoomApi.delete(this.room.id);
                } catch (err) {
                    console.log(err);
                }
                router.go(-1);
            },
            editRoom: function() {
                router.push({ name: 'EditRoom', params: { id: this.room.id, icon: this.room.meta.icon}})
            }
      }
    };
</script>



