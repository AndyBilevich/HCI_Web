<template>
  <div>
    <h1>Rooms</h1>
    <v-row dense>
      <v-col cols="2" v-for="indDevice in deviceList" :key="indDevice.name">
          <CategoryCard :categoryName="indDevice.name" :categoryIcon="indDevice.icon" :whereTo="indDevice.link" />
      </v-col>
    </v-row>

    <router-link class="routerLink" to="/add_room">
      <v-btn class="add_btn" color="primary" fab big bottom right>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </router-link>
  </div>
</template>

<script>
  import CategoryCard from "@/components/CategoryCard";
  export default {
    components: {
      CategoryCard
    },
    data: () => ({
      hidden: false,
      deviceList: [
        {
          name: 'Living',
          icon: 'mdi-home',
          link: '/rooms/algo'
        },
        {
          name: 'BathRoom',
          icon: 'mdi-home',
          link: '/rooms/algo'
        },
        {
          name: 'BedRoom',
          icon: 'mdi-home',
          link: '/rooms/algo'
        },
      ]
    })
  };
</script>

<style>
.add_btn {
  position: absolute;
  bottom: 7%;
  left: 88%;
  float: right;
}
</style>
