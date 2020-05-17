<template>
  <div class="settings">
    <h1 class="title text-left" >Settings</h1>
    <v-row>

      <v-col cols="6">
        <div class="tab_container">
          <div class="ins_tab_container">
            <h3 class="text-left overline">Personalize</h3>
            <v-row>
              <v-col cols="6">
              <h4 class="text-left font-regular">Toggle Dark Mode</h4>
              </v-col>
              <v-spacer/>
              <v-col cols="2">
                <v-switch
                  class="d-inline"
                  v-model="switchDark"
                ></v-switch>
              </v-col>
            </v-row>
          </div>
          <v-divider/>
        </div>
      </v-col>

      <v-col cols="6">
        <div class="tab_container">
          <div class="ins_tab_container">
            <h3 class="text-left overline">Font</h3>
            <v-row>
              <v-col cols="6">
              <h4 class="text-left font-regular">Font Size</h4>
              </v-col>
              <v-spacer/>
              <v-col cols="3">
                <v-menu
                  v-model="value"
                  close-on-click
                  close-on-content-click
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="background_fill"
                      v-on="on"
                    >
                      {{items[selected].title}}
                    </v-btn>
                  </template>
                  <v-list
                    color="background"
                  >
                    <v-list-item
                      v-for="(item, index) in items"
                      :key="index"
                      @click="selected=index"
                    >
                      <v-list-item-title class="text-center">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </div>
          <v-divider class="bottom"/>
        </div>
      </v-col>

    </v-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'C' },
          { title: 'F' },
        ],
        selected: 0,
        switchDark: this.$vuetify.theme.dark,
        value: false,
      }
    },
    watch: {
      switchDark(newValue){
        //called whenever switch1 changes
        this.$vuetify.theme.dark = newValue;
      },
    }
  }
</script>

<style scoped>
.title {
  margin-left: 35px;
}
.option_tab {
  padding: 10px;
}
.tab_container {
  height:100%;
  padding: 35px;
}
.ins_tab_container {
  height:100%;
}
</style>