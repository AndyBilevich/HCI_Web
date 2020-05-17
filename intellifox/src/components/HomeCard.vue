<template>
  <div>
  <v-card v-if="selected" class="cards background1--text">
    
    <v-card-title>
      <span class="headline background1--text">{{name}}</span>
      <v-spacer/>
      <v-menu close-on-click close-on-content-click class="menu">
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" text icon>
                    <v-icon large color="background2">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                 <v-list>
                  <v-list-item>
                    <router-link class="routerLink" to='/edit_home' >
                      <v-btn text>
                        <v-icon>mdi-pencil</v-icon> 
                        Edit
                      </v-btn>
                    </router-link>  
                  </v-list-item>
                  <v-list-item>
                    <v-btn 
                      text
                      @click="dialog = true"
                    >
                      <div>
                        <v-icon>mdi-trash-can</v-icon>
                        Delete
                      </div>
                    </v-btn>
                  </v-list-item>
                </v-list>
      </v-menu>
    </v-card-title>

    <v-card-subtitle class="text-left background1--text">{{desc}}</v-card-subtitle>
    <v-card-actions>
      <v-card-subtitle class="text-left background1--text">Rooms: Devices:</v-card-subtitle>
    </v-card-actions>

  </v-card>

  <v-card class="background1" v-else>
    <v-card-title>
      <span class="headline text--text">{{name}}</span>
      <v-spacer/>
      <v-menu close-on-click close-on-content-click class="menu">
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" text icon>
                    <v-icon large color="text">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                 <v-list>
                  <v-list-item>
                    <router-link class="routerLink" to='/edit_home' >
                      <v-btn text>
                        <v-icon>mdi-pencil</v-icon> 
                        Edit
                      </v-btn>
                    </router-link>  
                  </v-list-item>
                  <v-list-item>
                    <v-btn 
                      text
                      @click="dialog = true"
                    >
                      <div>
                        <v-icon>mdi-trash-can</v-icon>
                        Delete
                      </div>
                    </v-btn>
                  </v-list-item>
                </v-list>
      </v-menu>
    </v-card-title>
    <v-card-subtitle class="text-left">{{desc}}</v-card-subtitle>
    <v-card-actions>
      <v-card-subtitle class="text-left">Rooms: Devices:</v-card-subtitle>
    </v-card-actions>
  </v-card>
  
  <v-dialog
    v-model="dialog"
    max-width="290"
  >
    <v-card color="background3">
      <v-card-title class="headline">Be careful</v-card-title>

      <v-card-text>
        Are you sure you want to delete this house? <br/> This action is irreversible.
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="window"
          flat
          @click="dialog = false"
        >
          Cancel
        </v-btn>

        <v-btn
          color="error"
          flat
          @click="dialog = false"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  </div>
</template>

<script>
export default {
  props: {
    id: String,
    name: String,
    desc: String,
    selected: Boolean,
  },
  data: () => ({
    dialog: false,
  })
};
</script>

<style>
.card {
  margin: 20px;
}

.routerLink {
  text-decoration: none;
} 

.menu {
  z-index:4;
  position:absolute;
  right:200px;
  top:0px;
}
</style>

