<template>
  <div>
    <div >
      <v-card 
        class="card"
        height="200px"
        width="170px"
        color = "red"
        :color="var"
        >
        <div>
          <v-icon>{{category-icon}}</v-icon>
        </div>

        <div style="margin-top:80%;" class=" card_bottom background_fill">
          <v-card-text class="text--primary" >
              {{category-name}}
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
    props: {
      category-name,
      category-icon,
      url-to-go
    }
  }

  
</script>
 
