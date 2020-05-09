<template> 
  <div>
    <div class="text-center">
      <v-sheet style ="speakerTopCard"> 
        <span>
          <v-icon>speaker</v-icon>
          <div>
            <span>
              <h3>{{speaker-name}}</h3>
              <v-icon>flechita</v-icon>
            </span>
            {{playing}}
            


          </div>
        
        
        </span>
      </v-sheet>
    </div>
    <div>
      <v-sheet style ="speakerTopCard"> Tarjeta de abajooo</v-sheet>
    </div>
  </div>
</template>


<style>

  .speakerTopCard{
    color: "red";

  }

</style>

<script>
  export default {
    props: {
      
    },
    data: () => ({
      
    }),
  }
  
</script>