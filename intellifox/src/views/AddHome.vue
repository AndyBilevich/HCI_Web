<template>
  <div>
    <h1 class="text-left">Add House</h1>
   
      <v-row>
        <v-col cols="1"></v-col>

        <v-col cols="4">
          <h3 align="left">Name:</h3>
          <v-text-field
            label="Name:"
            solo
          ></v-text-field>
        </v-col>

        <v-col cols="1"></v-col>

        <v-col cols="4">
          <h3 align="left">Description (optional):</h3>
          <v-text-field
            label="Description"
            solo
          ></v-text-field>
        </v-col>
      </v-row>


      <v-row>
        <v-col cols="1"></v-col>        
        <v-col cols="4">
        <h3 align="left">Pin (optional):</h3>
          <v-text-field
            label="Pin"
            solo
          ></v-text-field>
        </v-col>
      </v-row>
    

    
      <v-row justify="end" align="end">
        <v-col cols="8"></v-col>
        <router-link class="routerLink" to="/homes">
          <v-btn class="ma-2" outlined large color="primary">Cancel</v-btn>
        </router-link>
        <router-link class="routerLink" to="/homes">
          <v-btn class="my-2" depressed large color="primary">Save</v-btn>
        </router-link>
      </v-row>
    
  </div>
</template>


<style scoped>
   .routerLink {
    text-decoration: none;
  }  
</style>