<template>
  <div class="devices">
    <h1>Devices</h1>

    <v-row dense>
      <v-col cols="2" v-for="indDevice in deviceList" :key="indDevice.name">
          <CategoryCard :categoryName="indDevice.name" :categoryIcon="indDevice.icon" :whereTo="indDevice.link" />
      </v-col>
    </v-row>

    <router-link class="routerLink" to="/add_device">
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
          name: 'Air Conditioners',
          icon: 'mdi-air-conditioner',
          link: '/devices/air-conditioners'
        },
        {
          name: 'Alarms',
          icon: 'mdi-alarm-light-outline',
          link: '/devices/alarms'
        },
        {
          name: 'Awnings',
          icon: 'mdi-cat',
          link: '/devices/awnings'
        },
        {
          name: 'Blinds',
          icon: 'mdi-blinds',
          link: '/devices/blinds'
        },
        {
          name: 'Curtains',
          icon: 'mdi-window-open-variant',
          link: '/devices/curtains'
        },
        {
          name: 'Doors',
          icon: 'mdi-door',
          link: '/devices/doors'
        },
        {
          name: 'Fridges',
          icon: 'mdi-fridge-outline',
          link: '/devices/fridges'
        },
        {
          name: 'Lights',
          icon: 'mdi-lightbulb-on-outline',
          link: '/devices/lights'
        },
        {
          name: 'Ovens',
          icon: 'mdi-toaster-oven',
          link: '/devices/ovens'
        },
        {
          name: 'Speakers',
          icon: 'mdi-speaker',
          link: '/devices/speakers'
        },
        {
          name: 'Sprinklers',
          icon: 'mdi-sprinkler-variant',
          link: '/devices/sprinklers'
        },
        {
          name: 'Taps',
          icon: 'mdi-water-pump',
          link: '/devices/taps'
        },
        {
          name: 'Vacuums',
          icon: 'mdi-robot-vacuum',
          link: '/devices/vacuums'
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