<template>
    <div class="room">
        <v-row>
            <v-col cols="2">
                <router-link class="routerLink" to="/rooms">
                    <v-btn color="primary" fab big bottom text right>
                    <v-icon x-large >mdi-keyboard-backspace</v-icon>
                    </v-btn>
                </router-link>
            </v-col>
            <v-col cols="6">
                <h1>{{room.name}}</h1>
            </v-col>
            <v-col cols="2">  
                    <v-menu close-on-click close-on-content-click absolute>
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" text icon>
                                <v-icon large>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item-group>
                                <v-list-item to="/edit_device">
                                    <v-icon>mdi-pencil</v-icon>Edit
                                </v-list-item>
                                <v-list-item @click="dialog=true">
                                    <v-icon>mdi-trash-can</v-icon>Delete
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-menu>
            </v-col>
        </v-row>

        <v-dialog
            v-model="dialog"
            max-width="290"
        >
            <v-card color="error_window">
            <v-card-title class="headline">Be careful</v-card-title>

            <v-card-text>
                Are you sure you want to delete this Room? <br/> This action is irreversible.
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="window"
                flat="flat"
                @click="dialog = false"
                >
                Cancel
                </v-btn>
                <v-btn
                color="error"
                flat="flat"
                @click="dialog = false"
                >
                Delete
                </v-btn>
            </v-card-actions>

            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            room: Object
        },
        data: function() {
            return ({
                
            })
        },
    };
</script>



