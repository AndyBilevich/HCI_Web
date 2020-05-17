<template>
  <div class="addDevice">
    <h1 align="left">Add device</h1>

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

    <h3 align="left">Device type:</h3>

    <v-row>
      <v-col>
        <v-btn class="cards" fab x-large >
          <v-icon class="background2--text">mdi-lightbulb-on-outline</v-icon>
        </v-btn>
        <p class="mt-1">Light</p>
      </v-col>

      <v-col>
        <v-btn class="cards" fab x-large>
          <v-icon class="background2--text">mdi-air-conditioner</v-icon>
        </v-btn>
        <p class="mt-1">A/C</p>
      </v-col>

      <v-col>
        <v-btn class="cards" fab x-large>
          <v-icon class="background2--text">mdi-alarm-light-outline</v-icon>
        </v-btn>
        <p class="mt-1">Alarm</p>
      </v-col>

      <v-col>
        <v-btn class="cards" fab x-large>
          <v-icon class="background2--text">mdi-blinds</v-icon>
        </v-btn>
        <p class="mt-1">Blind</p>
      </v-col>

      <v-col>
        <v-btn class="cards" fab x-large>
          <v-icon class="background2--text">mdi-window-open-variant</v-icon>
        </v-btn>
        <p class="mt-1">Courtain</p>
      </v-col>

      <v-col>
        <v-btn class="cards" fab x-large>
          <v-icon class="background2--text">mdi-door</v-icon>
        </v-btn>
        <p class="mt-1">Door</p>
      </v-col>

      <v-col>
        <v-btn class="cards" fab x-large>
          <v-icon class="background2--text">mdi-fridge-outline</v-icon>
        </v-btn>
        <p class="mt-1">Fridge</p>
      </v-col>

      <v-col>
        <v-btn class="cards" fab x-large>
          <v-icon class="background2--text">mdi-toaster-oven</v-icon>
        </v-btn>
        <p class="mt-1">Oven</p>
      </v-col>

      <v-col>
        <v-btn class="cards" fab x-large>
          <v-icon class="background2--text">mdi-speaker</v-icon>
        </v-btn>
        <p class="mt-1">Speaker</p>
      </v-col>

      <v-col>
        <v-btn class="cards" fab x-large>
          <v-icon class="background2--text">mdi-sprinkler-variant</v-icon>
        </v-btn>
        <p class="mt-1">Sprinkler</p>
      </v-col>

      <v-col>
        <v-btn class="cards" fab x-large>
          <v-icon class="background2--text">mdi-robot-vacuum</v-icon>
        </v-btn>
        <p class="mt-1">Vacuum</p>
      </v-col>

      <v-col>
        <v-btn class="cards" fab x-large>
          <v-icon class="background2--text">mdi-water-pump</v-icon>
        </v-btn>  
        <p class="mt-1">Tap</p>
      </v-col>

      <v-col>
        <v-btn class="cards" fab x-large>
          <v-icon class="background2--text">mdi-cat</v-icon>
        </v-btn>
        <p class="mt-1">Awning</p>
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
          color="background1"
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



<style>

</style>



