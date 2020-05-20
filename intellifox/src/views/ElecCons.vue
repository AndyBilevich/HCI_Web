<template>
  <div class="eleccons">
    <v-row class="pl-2"> 
      <h1 class="pt-5">Electrical consumption</h1>
      <v-col cols="3">
      <v-overflow-btn 
          solo
          class="ml-5"
          :items="dropdown_time"
          label="Choose"
      ></v-overflow-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        dropdown_time: [
          'This year', 
          'This month', 
          'This week', 
          'Today',
        ],
      }
    },
  }
</script>
