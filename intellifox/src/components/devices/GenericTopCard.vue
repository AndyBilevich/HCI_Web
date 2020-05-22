<template>
  <div>
    <div class="text-center" >
      <v-card color="background1">
        <v-row align="center">
          <v-col cols="3">
            <v-icon size="100">{{icon}}</v-icon>
          </v-col>
          <v-col cols="5">
            <v-row>
              <v-card-actions>
                <v-card-title class="headline">
                {{ title }}
                <v-btn icon @click="click">
                  <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
                </v-card-title>
              </v-card-actions>
            </v-row>
            <v-row>
              <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
            </v-row>
          </v-col>
          <!-- <v-col cols="6"> -->
            <v-col cols="1">
              <v-btn text icon large v-if="fav" @click="fav=false">
                <v-icon large>mdi-heart</v-icon>
              </v-btn>
              <v-btn text icon v-if="!fav" @click="fav=true">
                <v-icon large>mdi-heart-outline</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="1">
              <v-switch
                v-model="switchState"
                :disabled="switchLocked"
                :loading="switchLoads"
                color = "primary"
              ></v-switch>
            </v-col>
            <v-col cols="1">
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
          <!-- </v-col> -->
        </v-row>

      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card color="error_window">
          <v-card-title class="headline">Be careful</v-card-title>

          <v-card-text>
            Are you sure you want to delete this device? <br/> This action is irreversible.
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
  data: function() {
    return {
      hidden:false,
      dialog:false,
      fav:false, 
      switch1:this.switchState,
      switchDisabled:this.switchLocked,
      switchLoading:this.switchLoads,
    }
  },
  props: {
    icon: String,
    title: String,
    subtitle: String,
    deleteID: String,
    show: Boolean,
    click: Function,
    switchState: Boolean,
    switchLocked: Boolean,
    switchLoads: Boolean,
  },
  methods: {
    switchLock: function() {
      this.switchLoading = 'error';
      this.switchDisabled = true;
    }
  },
  watch: {
    switchState: function(new_val) {
      this.switchLock();
      this.$emit('switch_changed', new_val);
    }
  }
};
</script>