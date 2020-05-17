<template>
  <div class="history">
    <v-row>
      <v-col  cols="6"><h1 class="title text-left">History</h1></v-col>
      <v-col class = "d-flex align-center" cols="2">
        <v-select 
          :items="times"
          label="Timelapse"
        ></v-select>
      </v-col>
      <v-col cols="1"></v-col>
      
      <v-col class = "d-flex align-center" cols="2">
            <v-dialog v-model="dialog" scrollable max-width="600px" >
                <template v-slot:activator="{ on }">
                    <v-btn outlined color="primary" v-on="on">
                        Choose Device
                    </v-btn>
                </template>
                <v-card color="background3">
                    <v-card-title>
                        <span class="headline">Filter By Device Or Room</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-select
                                :items="dev_rooms"
                                label="Room"
                                ></v-select>
                            </v-col>
                            <v-col cols="6">
                                <v-select
                                :items="dev_types"
                                label="Type"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col align="center" justify="left">
                                <v-text-field
                                    background2-color="background2"
                                    placeholder="Search..."
                                    clearable
                                    solo
                                    append-icon="mdi-magnify"
                                    hide-details
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-card  color="background2" width="100%" style="height: 300px; overflow: scroll;">
                                <div v-for="device in devList" :key="device.name">
                                    <v-row>
                                        <v-row>
                                            <v-col cols="1"/>
                                            <v-col cols="1">
                                                <v-icon medium >{{ device.icon }}</v-icon>
                                            </v-col>
                                            <v-col cols="9">
                                                <h1>{{ device.name }}</h1>
                                            </v-col>
                                        </v-row>
                                    </v-row>
                                    <v-divider/>
                                </div>
                            </v-card>
                        </v-row>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-2" outlined large color="primary" @click="dialog = false">Close</v-btn>
                        <v-btn class="my-2" depressed large color="primary" @click="dialog = false">Filter</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        
      </v-col>      
      <v-col class = "d-flex align-center" cols="1">
        <v-btn icon>
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    data: () => ({
      times: ['1 hour ago', '1 day ago',  '2 days ago', '1 week ago', '1 year ago'],
      dev_rooms: ['Living room', 'Bed', 'Bathroom', 'Garden', 'Garden', 'Garden'],
      dev_types: ['Light', 'A/C', 'Blind', 'Speaker', 'Alarm', 'Door'],
      type: 'hex',
      hex: '#FF00FF',
      dialog: false,
      dialogm1: '',
      devList: [
        {
            name: "mati's table light",
            icon: "mdi-lightbulb-on-outline"
        },
        {
            name: "mati's room A/Cs",
            icon: "mdi-air-conditioner"
        },
        {
            name: "mati's room blinds",
            icon: "mdi-blinds"
        },
        {
            name: "mati's room blinds",
            icon: "mdi-blinds"
        },
        {
            name: "mati's room blinds",
            icon: "mdi-blinds"
        },
        {
            name: "mati's room blinds",
            icon: "mdi-blinds"
        },
        {
            name: "mati's room blinds",
            icon: "mdi-blinds"
        },
        {
            name: "mati's room blinds",
            icon: "mdi-blinds"
        },
      ],
      addedDevList: [
        {
          name: 'Air Conditioners',
          icon: 'mdi-air-conditioner',
          link: '/devices/air-conditioners'
        },
      ]
    }),

  }
</script>


<style scoped>
  .homes {
    padding: 10,
  }
  .card {
    margin: 20;
    cursor: pointer;
  }
  .title {
    margin-left: 35px;
  }
</style>