<template>
  <div>
    <h1 class="text-left">Add House</h1>
   
      <v-row dense>

       <v-col cols="5">
          <h3 align="left">Name:</h3>
          <v-text-field
            v-model="name"
            label="Name"
            solo
          ></v-text-field>

      </v-col>
        <v-col cols="1"></v-col>

        <v-col cols="5">
          <h3 align="left">Description (optional):</h3>
          <v-text-field
            v-model="desc"
            label="Description"
            solo
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>

        <v-col cols="5">
        <h3 align="left">Pin (optional):</h3>
          <v-text-field
            v-model="pin"
            label="Pin"
            solo
          ></v-text-field>
        </v-col>
      </v-row>
    
      <v-row>
        <v-col cols="9"></v-col>
        <v-btn @click="back" class="ma-2" outlined large color="primary">Cancel</v-btn>
        <v-btn @click="addHome" class="my-2" depressed large color="primary">Save</v-btn>
      </v-row>
    
  </div>
</template>

<script>
import router from '@/router';
import { HomeApi, Home } from '@/api';
export default {
  data: function() {
    return {
      name:"",
      desc:"",
      pin:"",
      rooms:0,
      devs:0
    }
  },
  methods: {
    back: function() {
      router.go(-1);
    },
    addHome: async function() {
      const home = new Home(
        null,
        this.name,
        {
          pin: this.pin,
          desc: this.desc,
          rooms: this.rooms,
          devs: this.devs
        }
      );
      try {
        await HomeApi.add(home);
      } catch (err) {
        console.log(err);
      }
      this.back();
    }
  }
};
</script>

<style scoped>
   .routerLink {
    text-decoration: none;
  }  
</style>