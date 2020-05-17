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

    <v-row align="center">
      <v-col v-for="d in devices" :key="d.id" align="center">
        <AddDeviceButton :selected="selectedDeviceID === d.id" :name="d.name" :icon="d.icon" @click.native="() => {selectedDeviceID = d.id;}"/>
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
          :items="dropdown_rooms"
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
  import AddDeviceButton from '@/components/AddDeviceButton.vue';
  export default {
    name: 'Devices',
    components: {
      AddDeviceButton
    },
    data: () => ({
      dropdown_rooms: ['Living room', 'Bed', 'Bathroom', 'Garden', 'room1', 'room2', 'room3', 'room4'],
      selectedDeviceID: 0,
      devices: [
        {
          id: 1,
          name: "Light",
          icon: "mdi-lightbulb-on-outline"
        },
        {
          id: 2,
          name: "A/C",
          icon: "mdi-air-conditioner"
        },
        {
          id: 3,
          name: "Alarm",
          icon: "mdi-alarm-light-outline"
        },
        {
          id: 4,
          name: "Blind",
          icon: "mdi-blinds"
        },
        {
          id: 5,
          name: "Courtain",
          icon: "mdi-window-open-variant"
        },
        {
          id: 6,
          name: "Door",
          icon: "mdi-door"
        },
        {
          id: 7,
          name: "Fridge",
          icon: "mdi-fridge-outline"
        },
        {
          id: 8,
          name: "Oven",
          icon: "mdi-toaster-oven"
        },
        {
          id: 9,
          name: "Speaker",
          icon: "mdi-speaker"
        },
        {
          id: 10,
          name: "Sprinkler",
          icon: "mdi-sprinkler-variant"
        },
        {
          id: 11,
          name: "Vacuum",
          icon: "mdi-robot-vacuum"
        },
        {
          id: 12,
          name: "Tap",
          icon: "mdi-water-pump"
        },
        {
          id: 13,
          name: "Awning",
          icon: "mdi-cat"
        },
      ]
    }),
  }
</script>



<style>

</style>



