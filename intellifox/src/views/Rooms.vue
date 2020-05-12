<template>
  <div>
    <v-row dense>
      <v-col cols="3">
        <CategoryCard category_name="Living" category_icon="mdi-home" />
      </v-col>
    </v-row>

    <v-btn color="purple" absolute fab dark big bottom right>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
  import CategoryCard from "@/components/CategoryCard";
  export default {
    components: {
      CategoryCard
    },
    data: () => ({
      hidden: false
    })
  };
</script>
 
<style scoped>
  .card {
    margin: 20px;
  }
  .card_bottom {
    position: relative;
    margin-top: 80%;
    height: 50px;
    width: 100%;
  }
  
</style>