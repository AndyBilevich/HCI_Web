<template>
  <div>
    <div >

      <v-row dense>
        <v-col cols="3">
          <v-card 
            class="card"
            height="200px"
            width="170px"
            color= "red"
          >
            <div>
              <v-icon>mdi-folder-open</v-icon>
            </div>

         <div style="margin-top:80%;" class=" card_bottom background_fill">
              <v-card-text class="text--primary" >
                  Living room
              </v-card-text>
            </div>
          </v-card>
        </v-col>

        <v-col cols="3">
          <v-card 
            class="card"
            height="200px"
            width="170px"
            color= "red"
          >
            <div>
              <v-icon>mdi-folder-open</v-icon>
            </div>

            <div style="margin-top:80%;" class=" card_bottom background_fill">
              <v-card-text class="text--primary" >
                  Living room
              </v-card-text>
            </div>
          </v-card>
        </v-col>

      </v-row>
    </div> 

    <div >
      <v-card 
        class="card"
        height="200px"
        width="170px"
        color = "red"
        >
        <div>
          <v-icon>mdi-folder-open</v-icon>
        </div>

        <div style="margin-top:80%;" class=" card_bottom background_fill">
          <v-card-text class="text--primary" >
              Bathroom
          </v-card-text>
        </div>
        
      </v-card>
      
    </div> 
    
    <v-btn 
      color="purple"
      fab
      dark
      big
      bottom
      right
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    
  </div>
</template>

<script>
  export default {
    data: () => ({
      hidden: false,
    }),
  }
</script>
 




 