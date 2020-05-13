<template>
  <div class="settings">
    <h1 class="title text-left" >Settings</h1>
    <v-row>
      <v-col cols="6">
        <v-row>
          <div class="text-left">
            <h3>PERSONALIZE</h3>
            <h4>Toggle Dark Mode</h4>
          </div>
          <v-switch
            class="text-right"
            v-model="switchDark"
          ></v-switch>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        switchDark: this.$vuetify.theme.dark
      }
    },
    watch: {
      switchDark(newValue){
        //called whenever switch1 changes
        this.$vuetify.theme.dark = newValue;
        console.log(newValue);
      },
    }
  }
</script>

<style scoped>
.title {
  margin-left: 35px;
}
</style>