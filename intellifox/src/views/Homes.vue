<template>
  <div class="homes">
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <HomeCard color="#385F73" name="Cottage" desc="Ski house for winter holidays" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeCard from '@/components/HomeCard.vue';
export default {
  name: 'Homes',
  components: {
    HomeCard
  }

};
</script>

<style>
.homes {
  padding:
}
</style>