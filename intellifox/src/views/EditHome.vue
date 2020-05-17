<template>
  <div>
    <h1 class="text-left">Edit House</h1>
   
      <v-row>
        <v-col cols="1"></v-col>

        <v-col cols="4">
            <v-row> <p text-align:left>Name:</p> </v-row>
            <v-row>
                <v-text-field
                    single-line
                    filled
                >{{name}}</v-text-field>
            </v-row>
            
          
        </v-col>

        <v-col cols="1"></v-col>

        <v-col cols="4">
            <v-row> <p text-align:left>Description (optional):</p> </v-row>
            <v-row>
                <v-text-field
                    single-line
                    filled
                >{{name}}</v-text-field>
            </v-row>
        </v-col>
      </v-row>


      <v-row>
        <v-col cols="1"></v-col>        
        <v-col cols="4">
            <v-row> <p text-align:left>Pin (optional):</p> </v-row>
            <v-row>
                <v-text-field
                    single-line
                    filled
                >{{desc}}</v-text-field>
            </v-row>
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

<script>
export default {
  props: {
    id: String
  }
};
</script>