<template>
    <v-card
        :color="color"
    >
            <v-card-title class="headline">{{name}}</v-card-title>
            <v-card-subtitle>{{desc}}</v-card-subtitle>
            <v-card-actions>
              <p text>Rooms: Devices:</p>
            </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        props: {
            color,
            name,
            desc
        }
    }
</script>

<style>
    .card {
        margin: 20px;
    }
</style>