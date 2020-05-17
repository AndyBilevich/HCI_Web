<template>
  <div class="editDevice">
    <h1 align="left">Edit device</h1>

    <v-row dense> 
      <v-col cols="6">
        <h3 align="left">Name:</h3> 
        <v-col cols="10">
          <v-text-field label="Name" solo></v-text-field>
        </v-col>
      </v-col>
      <v-col cols="6">
        <h3 align="left">Description (optional):</h3> 
        <v-col cols="10">
          <v-text-field label="Description" solo></v-text-field>
        </v-col>
      </v-col>
    </v-row>

    <v-row class="pl-2">
      <h3 class="pt-5">Require PIN code:</h3>
      <v-checkbox
        v-model="checkbox"
      ></v-checkbox>
    </v-row>
  
    <v-row class="pl-2"> 
      <h3 class="pt-5">Select room:</h3>
      <v-col cols="3">
      <v-overflow-btn 
          solo
          :items="dropdown_font"
          label="None"
          color="#121212"
      ></v-overflow-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="10"></v-col>
      <v-btn class="ma-2" outlined large color="primary">Cancel</v-btn>
      <v-btn class="my-2" depressed large color="primary">Save</v-btn>
    </v-row>

  </div>
</template>

<script>
  export default {
    data: () => ({
      dropdown_font: ['Living room', 'Bed', 'Bathroom', 'Garden', 'room1', 'room2', 'room3', 'room4'],
  
    }),
  }
</script>