<template>
  <div>
    <h1 class="text-left">Add Routine</h1>
        <v-row>
            <v-col cols="6">
                <v-row>
                    <v-text-field label="Name:" filled/>
                </v-row>    
                <v-row>
                    <v-text-field label="Description (optional):" filled/>
                </v-row>
                <v-row class="pl-2">
                    <h3 class="pt-5">Require PIN code:</h3>
                    <v-checkbox
                        v-model="checkbox"
                    ></v-checkbox>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <h2 class="text-left">Chosen Color:</h2>
                    </v-col>
                    <v-col cols="3">
                         <v-icon large :color="showColor" >mdi-circle</v-icon>
                    </v-col>
                    <v-col cols="3">
                         <h2 class="text-left">{{ showColor }}</h2>
                    </v-col>
                </v-row>
            </v-col>
         
            <v-col cols="6" >
                <v-row justify="center">
                    <v-color-picker v-model="color" hide-inputs></v-color-picker>
                </v-row>
            </v-col>
        </v-row>
            <v-col cols="4">
                <v-dialog v-model="dialog" scrollable max-width="600px" >
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" x-large v-on="on">
                            <v-icon>mdi-plus</v-icon>
                            Add Action
                        </v-btn>
                    </template>
                    <v-card color="background3">
                        <v-card-title>
                            <span class="headline">Add Action</span>
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
                            <v-btn class="my-2" depressed large color="primary" @click="dialog = false">Add</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>

        <v-row>
            
        </v-row>

        <v-row justify="end" align="end">
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
      dev_rooms: ['Living room', 'Bed', 'Bathroom', 'Garden', 'Garden', 'Garden'],
      dev_types: ['Light', 'A/C', 'Blind', 'Speaker', 'Alarm', 'Dor'],
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

    computed: {
      color: {
        get () {
          return this[this.type]
        },
        set (v) {
          this[this.type] = v
        },
      },
      showColor () {
        if (typeof this.color === 'string') return this.color

        return JSON.stringify(Object.keys(this.color).reduce((color, key) => {
          color[key] = Number(this.color[key].toFixed(2))
          return color
        }, {}), null, 2)
      },
    }
  }
</script>


<style scoped>
   
</style>