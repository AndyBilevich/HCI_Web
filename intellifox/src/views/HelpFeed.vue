<template>
  <div class="helpfeed">
    <v-row>
      <h1 class="title text-left">Help and Feedback</h1>
    </v-row>

    <h3 class = "subtitle text-left">About Us </h3>
    <p>Somos un grupo de alumnos del itba con muchisima paja y unas gigantescas ganas de irnos a la mierda a comer pancitos increibles</p>
    
    <v-divider></v-divider>
    
      <v-col class = "d-flex align-center" cols="2">
            <v-dialog v-model="dialog1" scrollable max-width="600px" >
                <template v-slot:activator="{ on }">
                    <v-btn text color="primary" v-on="on">
                        NEED HELP?
                    </v-btn>
                </template>
                <v-card color="background3">
                    <v-card-title>
                        <span class="headline">Send us your question</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                          <v-text-field label="Name" :rules="rules" hide-details="auto"></v-text-field>
                          <v-text-field label="Email" :rules="rules" hide-details="auto"></v-text-field>
                          <v-row>
                              <v-col  class = "d-flex align-center" cols="6">
                                  <h2>I have problems with:</h2>
                              </v-col>
                              <v-col cols="6">
                                  <v-select
                                  :items="dev_types"
                                  label="Type"
                                  ></v-select>
                              </v-col>
                          </v-row>
                          
                          <v-row>
                            <v-textarea
                              filled
                              name="input-7-4"
                              label="Details"
                              value=""
                            ></v-textarea>
                          </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-2" outlined large color="primary" @click="dialog1 = false">Close</v-btn>
                        <v-btn class="my-2" depressed large color="primary" @click="dialog1 = false">Send</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>



    </v-col>
    <v-divider></v-divider>
    <v-col cols="1">

      <v-dialog v-model="dialog2" scrollable max-width="600px" >
          <template v-slot:activator="{ on }">
              <v-btn text color="primary" v-on="on">
                  SEND FEEDBACK
              </v-btn>
          </template>
          <v-card color="background3">
              <v-card-title>
                  <span class="headline">Send us your question</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                    <v-text-field class="inputs" label="Name" :rules="rules" hide-details="auto"></v-text-field>
                    <v-divider></v-divider>
                    <v-text-field class="inputs" label="Email" :rules="rules" hide-details="auto"></v-text-field>
                    <v-textarea
                      class="inputs" 
                      filled
                      name="input-7-4"
                      label="Comentary"
                      value=""
                    ></v-textarea>

                </v-container>
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="ma-2" outlined large color="primary" @click="dialog2 = false">Close</v-btn>
                  <v-btn class="my-2" depressed large color="primary" @click="dialog2 = false">Send</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>


    
    
    </v-col>
  </div>
</template>




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
  .subtitle {
    margin-top: 15px;
    margin-left: 35px;
  }

  .inputs {
    margin-top: 20px;
  }
</style>

<script>
  export default {
    data: function() {
      return {
        dev_types: ['Light', 'A/C', 'Blind', 'Speaker', 'Alarm', 'Door'],
        type: 'hex',
        hex: '#FF00FF',
        dialog1: false,
        dialog2: false,
        dialogm1: '',
        

        rules: [
          value => !!value || 'Required.',
          value => (value && value.length >= 3) || 'Min 3 characters',
        ],
      }
    },

  }
</script>