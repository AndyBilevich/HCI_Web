<template>
  <div>
    <h1 class="text-left">Edit House</h1>
   
      <v-row>
        <v-col cols="1"></v-col>

        <v-col cols="4">
            <v-row> <p text-align:left>Name:</p> </v-row>
            <v-row>
                <v-text-field
                    v-model="home.name"
                    single-line
                    solo
                ></v-text-field>
            </v-row>
        </v-col>

        <v-col cols="1"></v-col>

        <v-col cols="4">
            <v-row> <p text-align:left>Description (optional):</p> </v-row>
            <v-row>
                <v-text-field
                    v-model="home.meta.desc"
                    single-line
                    solo
                ></v-text-field>
            </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="1"></v-col>        
        <v-col cols="4">
            <v-row> <p text-align:left>Pin (optional):</p> </v-row>
            <v-row>
                <v-text-field
                    v-model="home.meta.pin"
                    single-line
                    solo
                ></v-text-field>
            </v-row>
        </v-col>
      </v-row>
    

      <v-row align="end">
        <v-col cols="8"></v-col>
        <router-link class="routerLink" to="/homes">
          <v-btn class="ma-2" outlined large color="primary">Cancel</v-btn>
        </router-link>
        <router-link class="routerLink" to="/homes">
          <v-btn @click="editHome" class="my-2" depressed large color="primary">Save</v-btn>
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
import { HomeApi, Home } from '@/api';
export default {
  data: function() {
    return {
      home: {},
    }
  },
  methods: {
    editHome: async function() {
      const home = new Home(
        this.home.id,
        this.home.name,
        {
          pin: this.home.meta.pin,
          desc: this.home.meta.desc,
          rooms: this.home.meta.rooms,
          devs: this.home.meta.devs
        }
      );
      try {
        await HomeApi.modify(home);
      } catch (err) {
        console.log(err);
      }
    },
    retrieveHome: async function(id) {
      const ans = await HomeApi.get(id);
      this.home = ans.result;
      if (!this.home.meta)
        this.home.meta = {};
    }
  },
  mounted: function() {
    this.home.id = this.$route.params.id
    console.log(this.home.id); 
    this.retrieveHome(this.home.id);
  }
};
</script>