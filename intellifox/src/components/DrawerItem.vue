<template>
    <v-list-item @click="onClick" class="routerLink" link>
        <v-list-item-action>
            <v-icon class="icon--text">{{icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title class="icon--text">{{text}}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
import router from '@/router';
export default {
  props: {
    icon: String,
    text: String,
    to: Object,
  },
  methods: {
    onClick: async function() {
      try {
        router.push(this.to);
      } catch (err) {
          console.log(err);
      }
    }
  },
};
</script>

<style scoped>
.routerLink {
  text-decoration: none;
}
</style>

