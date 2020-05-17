<template>
  <div>
    <div class="text-center" >
      <v-card color="#385F73">
        <v-row align="center">
          <v-col cols="2">
            <v-icon size="100">{{icon}}</v-icon>
          </v-col>
          <v-col cols="7">
            <v-card-title class="headline">
              {{ title }}
              <v-btn v-on="on" text icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-subtitle>{{subtitle}}</v-card-subtitle>
          </v-col>
          <v-col cols="3">
            <v-btn v-on="on" text icon>
              <v-icon large>mdi-heart</v-icon>
            </v-btn>
            <v-btn v-on="on" text icon>
              <v-icon large>mdi-power</v-icon>
            </v-btn>
            <v-menu close-on-click close-on-content-click absolute>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" text icon>
                  <v-icon large>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item-group>
                  <v-list-item to="/edit_device">
                    <v-icon>mdi-pencil</v-icon>Edit
                  </v-list-item>
                  <v-list-item @click="dialog=true">
                    <v-icon>mdi-trash-can</v-icon>Delete
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>

      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card color="error_window">
          <v-card-title class="headline">Be careful</v-card-title>

          <v-card-text>
            Are you sure you want to delete this house? <br/> This action is irreversible.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="window"
              flat="flat"
              @click="dialog = false"
            >
              Cancel
            </v-btn>

            <v-btn
              color="error"
              flat="flat"
              @click="dialog = false"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


    </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    hidden: false,
    dialog:false,
  }),
  props: {
    icon: String,
    title: String,
    subtitle: String,
    deleteID: String,
  }
};
</script>