<template>
  <div>
    <div >
      <v-card 
        class="card"
        height="200px"
        width="170px"
        >
        <v-img
          class="white--text align-end"
          src="../assets/Po.jpg">
        </v-img>
        <div class="background_fill card_bottom">
          <v-card-text class="text--primary" >
              Recontra aguante Po
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
 




 