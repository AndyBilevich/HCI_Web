<template>
    <v-card v-if="selected" class="cards background_fill--text">
        <v-card-title class="headline background_fill--text">{{name}}</v-card-title>
        <v-card-subtitle class="text-left background_fill--text">{{desc}}</v-card-subtitle>
        <v-card-actions>
            <v-card-subtitle class="text-left background_fill--text">Rooms: Devices:</v-card-subtitle>
        </v-card-actions>        
    </v-card>
    <v-card class="background_fill" v-else>
        <v-card-title class="headline">{{name}}</v-card-title>
        <v-card-subtitle class="text-left">{{desc}}</v-card-subtitle>
        <v-card-actions>
            <v-card-subtitle class="text-left">Rooms: Devices:</v-card-subtitle>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        props: {
            name: String,
            desc: String,
            selected: Boolean
        }
    }
</script>

<style>
    .card {
        margin: 20px;
    }
</style>