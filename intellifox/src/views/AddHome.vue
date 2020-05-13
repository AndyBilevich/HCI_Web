<template>
  <div>
    <h1 class="text-left">Add House</h1>
   
      <v-row>
        <v-col cols="1"></v-col>

        <v-col cols="4">
          <v-text-field
            label="Name:"
            filled
          ></v-text-field>
        </v-col>

        <v-col cols="1"></v-col>

        <v-col cols="4">
          <v-text-field
            label="Description (optional):"
            filled
          ></v-text-field>
        </v-col>
      </v-row>


      <v-row>
        <v-col cols="1"></v-col>        
        <v-col cols="4">
          <v-text-field
            label="Pin (optional):"
            filled
          ></v-text-field>
        </v-col>
      </v-row>
    

    
      <v-row justify="end" align="end">
        <v-col cols="8"></v-col>
        <v-btn class="ma-2" outlined large color="primary">Cancel</v-btn>
        <div class="my-2">
            <v-btn depressed large color="primary">Save</v-btn>
        </div>
      </v-row>
    
  </div>
</template>


<style scoped>
   
</style>