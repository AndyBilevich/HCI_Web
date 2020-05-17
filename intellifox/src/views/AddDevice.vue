<template>
  <div class="addDevice">
    <h1>add device page</h1>

    <p align="left">Name:</p>

    <v-col cols="6">
      <v-text-field label="Name" solo></v-text-field>
    </v-col>

    <p align="left">Device type:</p>

    <v-col cols="12" align="center" justi>
      <v-btn color="primary" fab dark x-large>
        <v-icon>mdi-lightbulb-on-outline</v-icon>
      </v-btn>
      <v-btn color="primary" fab dark x-large>
        <v-icon>mdi-air-conditioner</v-icon>
      </v-btn>
      <v-btn color="primary" fab dark x-large>
        <v-icon>mdi-alarm-light-outline</v-icon>
      </v-btn>
      <v-btn color="primary" fab dark x-large>
        <v-icon>mdi-blinds</v-icon>
      </v-btn>
      <v-btn color="primary" fab dark x-large>
        <v-icon>mdi-window-open-variant</v-icon>
      </v-btn>
      <v-btn color="primary" fab dark x-large>
        <v-icon>mdi-door</v-icon>
      </v-btn>
      <v-btn color="primary" fab dark x-large>
        <v-icon>mdi-fridge-outline</v-icon>
      </v-btn>
      <v-btn color="primary" fab dark x-large>
        <v-icon>mdi-toaster-oven</v-icon>
      </v-btn>
      <v-btn color="primary" fab dark x-large>
        <v-icon>mdi-speaker</v-icon>
      </v-btn>
      <v-btn color="primary" fab dark x-large>
        <v-icon>mdi-sprinkler-variant</v-icon>
      </v-btn>
      <v-btn color="primary" fab dark x-large>
        <v-icon>mdi-robot-vacuum</v-icon>
      </v-btn>
      <v-btn color="primary" fab dark x-large>
        <v-icon>mdi-water-pump</v-icon>
      </v-btn>
      <v-btn color="primary" fab dark x-large>
        <v-icon>mdi-cat</v-icon>
      </v-btn>
    </v-col>

  
    <v-row>
    <v-col cols="2" align="center">
      
      <p>Select room</p>
      <v-overflow-btn
          :items="dropdown_font"
          label="None"
          color="#121212"
        ></v-overflow-btn>
      
    </v-col>
    </v-row>
    <v-row>
        <v-col cols="8"></v-col>
        <v-btn class="ma-2" outlined large color="primary">Cancel</v-btn>
        <div class="my-2">
            <v-btn depressed large color="primary">Save</v-btn>
        </div>
      </v-row>

  </div>
</template>

<script>
  export default {
    data: () => ({
      dropdown_font: ['Living room', 'Bed', 'Bathroom', 'Garden', 'Garden', 'Garden'],
  
    }),
  }
</script>



<style>

</style>



