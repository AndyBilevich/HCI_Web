<template>
  <div>
    <h1 class="text-left">Add House</h1>
    
    <v-col cols="12" sm="6" md="3">
        <v-text-field
        label="Name"
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6" md="3">
        <v-text-field
        label="Description (optional)"
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6" md="3">
        <v-text-field
        label="Pin (optional)"
      ></v-text-field>
    </v-col>
  </div>
</template>


<style scoped>
.homes {
  padding: 10,
}
.card {
  margin: 20;
  cursor: pointer;
}
</style>