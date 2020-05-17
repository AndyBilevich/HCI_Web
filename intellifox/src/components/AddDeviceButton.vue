<template>
  <div>
    <v-btn v-if="selected" class="primary" fab x-large>
        <v-icon color="background2">{{icon}}</v-icon>
    </v-btn>
    <v-btn class="cards" v-else fab x-large>
        <v-icon color="background2">{{icon}}</v-icon>
    </v-btn>
    <p class="mt-1">{{name}}</p>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    icon: String,
    id: String,
    selected: Boolean,
  },
};
</script>