<template>
  <div>
    <div class="text-center" >
      <v-card color="background1">
        <v-row align="center">
          <v-col cols="3">
            <v-icon :color="color" size="100">{{icon}}</v-icon>
          </v-col>
          <v-col cols="5">
            <v-row>
              <v-card-actions>
                <v-card-title v-if= "title.length <= 18" class="headline">
                {{ title }}
                <v-btn icon @click="click">
                  <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
                </v-card-title>

                <v-card-title v-else class="headline">
                {{ title.substr(0,18) + "..." }}
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
            <v-col cols="1" @click="addToFavourites">
              <v-btn v-if="!device.meta.favourites" text icon>
                <v-icon large>mdi-heart-outline</v-icon>
              </v-btn>
              <v-btn v-else text icon>
                <v-icon large>mdi-heart</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="1">
              <v-switch
                v-model="switchValue"
                :disabled="switchLocked"
                :loading="switchLoads"
                color = "primary"
              ></v-switch>
            </v-col>
            
            <v-col>
              <v-row class="ml-1">
                <v-menu close-on-click close-on-content-click absolute>
                  <template v-slot:activator="{ on }">
                    <v-btn v-on="on" text icon>
                      <v-icon large>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item-group>
                      <v-list-item @click="editDevice">
                        <v-icon>mdi-pencil</v-icon>Edit
                      </v-list-item>
                      <v-list-item @click="dialog=true">
                        <v-icon>mdi-trash-can</v-icon>Delete
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-menu>
              </v-row>
          </v-col> 
        </v-row>

      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card color="background3">
          <v-card-title class="headline">Be careful</v-card-title>

          <v-card-text>
            Are you sure you want to delete this device? <br/> This action is irreversible.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="window"
              @click="dialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              @click="deleteDevice"
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
import { HomeApi, DeviceApi , Device} from '@/api';
import router from '@/router';
export default {
  props: {
    model: Object,
    icon: String,
    iconColor: String,
    title: String,
    subtitle: String,
    deleteID: String,
    show: Boolean,
    click: Function,
    switchState: Boolean,
    switchLocked: Boolean,
    switchLoads: Boolean,
  },
  data: function() {
    return {
      hidden:false,
      dialog:false,

      switch1:this.switchState,
      switchDisabled:this.switchLocked,
      switchLoading:this.switchLoads,
      rooms: [],
      device: {
        meta: {}
      },
    }
  },
  mounted: function(){
    this.retrieveDevice();
  },
  methods: {
    switchLock: function() {
      this.switchLoading = 'error';
      this.switchDisabled = true;
    },
    retrieveDevice: async function(){
      const ans = await DeviceApi.get(this.model.id);
      this.device = ans.result;
      console.log(this.device);
    },
    editDevice: function(){
      var roomId = this.model.room ? this.model.room.id : 'none';
      router.push({ name: 'EditDevice', query: { room:roomId }, params:{id: this.model.id} });
    },
    addToFavourites: async function(){
      const device = new Device(
        this.device.id,
        {
          id: this.device.type.id,
        },
        this.device.name,
        { favourites: this.device.meta.favourites ? !this.device.meta.favourites : true }
      );
      try {
        await DeviceApi.modify(device);
        this.device.meta.favourites = !this.device.meta.favourites;
      } catch (err) {
        console.log(err);
      }
    },

    deleteDevice: async function() {
      try {
          await DeviceApi.delete(this.model.id);     
          if(this.model.room.id !== 'none'){
            const ans2 = await HomeApi.get(this.model.room.home.id);
            var auxHome = ans2.result;
            auxHome.meta.devs = auxHome.meta.devs - 1;
            await HomeApi.modify(auxHome);
          }
      } catch (err) {
          console.log(err);
      }
      this.$emit('upd_devs');
      this.dialog = false;
    },
    emitUpdDevs: async function(){
      this.$emit('upd_devs');
    },
    emitOnAction: async function(switchValue){
      this.$emit('on_action', switchValue);
    },
  },
  computed: {
    color: {
      get: function() {
        if (!this.switchValue)
          return '#555555';
        else
          return this.iconColor || '#FFFFFF';
      }
    },
    switchValue: {
      get: function() {
        return this.switchState;
      },
      set: function(new_val) {
        this.switchLock();
        this.$emit('set_switch_state', new_val);
      }
    }
  },
};
</script>