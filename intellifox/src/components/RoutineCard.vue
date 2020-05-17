<template>
  <div>
    <div class="text-center">
      <v-card color="#385F73" dark>
        <v-row align="center">
          <v-col cols="2">
            <v-icon size="100" :color="color" >mdi-circle</v-icon>
          </v-col>
          <v-col cols="7">
            <v-card-title class="headline">
              {{ name }}
            </v-card-title>
            <v-card-subtitle>{{ desc }}</v-card-subtitle>
          </v-col>
          <v-col cols="3">
            <v-btn v-on="on" text icon>
              <v-icon large>mdi-heart</v-icon>
            </v-btn>
            <v-btn v-on="on" text icon>
              <v-icon large>mdi-play</v-icon>
            </v-btn>
            <v-menu close-on-click close-on-content-click absolute>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" text icon>
                  <v-icon large>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-list-item>
                <v-list-item>
                  <v-icon>mdi-trash-can</v-icon>Delete
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    hidden: false
  }),
  props: {
    name: String,
    desc: String,
    color: String,
  }
};
</script>