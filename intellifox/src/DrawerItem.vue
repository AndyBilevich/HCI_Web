<template>
    <router-link v-for="(opt, idx) in drawer_options" :key="idx" class="routerLink" :class="display" :to="path">
        <v-list-item link>
            <v-list-item-action>
                <v-icon class="icon--text">{{icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title class="icon--text">{{text}}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </router-link>
</template>

<script>
import router from '@/router';
import { HomeApi } from '@/api';
export default {
  props: {
    icon: String,
    text: String,
    path: String,
    selected: Boolean,
    visible: Boolean,
  },
  data: () => ({
    display = (this.visible)?'d-display':'d-none'
  }),
  methods: {

  },
};
</script>

<style>
.routerLink {
  text-decoration: none;
}
</style>

