<template>
  <div class="addRoom">
    <h1 align="left">Add Room</h1>

    <v-row dense> 
      <v-col cols="4">
          <h3 align="left">Name:</h3>
          <v-text-field
            label="Name:"
            solo
          ></v-text-field>
          <h3 align="left">Image:</h3>
          <AddRoomCard></AddRoomCard>
      </v-col>
      <v-col cols="1"></v-col>
      <v-col cols="4">
          <h3 align="left">Description (optional):</h3>
          <v-text-field
            label="description"
            solo
          ></v-text-field>
          <v-col>
            <v-row>
              <h3 class="pt-5">Require PIN code:</h3>
              <v-checkbox
                v-model="checkbox"
              ></v-checkbox>
            </v-row>
          
            <v-row > 
              <h3 class="pt-5">Select house:</h3>
              <v-col cols="8">
              <v-overflow-btn 
                  solo
                  :items="dropdown_rooms"
                  label="None"
                  color="background1"
              ></v-overflow-btn>
              </v-col>
            </v-row>
        </v-col>
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
  import AddRoomCard from '@/components/AddRoomCard.vue';
  export default {
    name: 'Devices',
    components: {
      AddRoomCard
    },
    data: () => ({
      selectedIconID: 0,
      devices: [
        {
          id: 0,
          icon: "mdi-rhombus-split"
        },
        {
          id: 1,
          icon: "mdi-bed-outline"
        },
        {
          id: 2,
          icon: "mdi-shower"
        },
        {
          id: 3,
          icon: "mdi-flower-tulip-outline"
        },
        {
          id: 4,
          icon: "mdi-table-chair"
        },
        {
          id: 5,
          icon: "mdi-silverware-fork-knife"
        },
      ]
    }),
  }
</script>
