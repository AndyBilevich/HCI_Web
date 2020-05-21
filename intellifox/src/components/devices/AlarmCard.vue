<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard :click=" () => {show = !show}" title="title" subtitle="subtitle" icon="mdi-alarm-light-outline"></TopCard>
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

              <v-row class="mt-5">
                <v-col cols="2"></v-col>
                <v-btn large class="primary" @click="dialog=true">Change code</v-btn> 
                <v-col cols="2"></v-col>
                <v-btn large class="primary" @click="dialog2 = true">Deactivate</v-btn>
              </v-row>

              <v-row class="my-5"></v-row>

              <v-row class="mt-5">
                <v-col cols="2"></v-col>
                <h3>Mode:</h3>
                <v-col cols="1"></v-col>
                <v-btn-toggle tile class="mb-5">
                  <v-btn>
                    House mode
                  </v-btn>
                  <v-btn>
                    Regular mode
                  </v-btn>
                </v-btn-toggle>
              </v-row>

            <v-dialog
                v-model="dialog2"
                max-width="300"
              >
                <v-card class="pa-5 background1">
                  <v-col cols="1"></v-col>
                    <h3>Security code:</h3>
                    <v-col cols="8">
                      <v-text-field
                        :rules="rules"
                        counter="4"
                        type="number"
                      ></v-text-field>
                    </v-col>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-btn class="ma-2" outlined medium color="primary" @click="dialog2=false">Cancel</v-btn>
                    <v-btn class="my-2" depressed meduim color="primary" @click="dialog2=false">Deactivate</v-btn>
                  </v-row> 
                </v-card>
              </v-dialog>

              <v-dialog
                v-model="dialog"
                max-width="300"
              >
                <v-card class="pa-5 background1">
                  <v-col cols="1"></v-col>
                    <h3>Old code:</h3>
                    <v-col cols="8">
                      <v-text-field
                        :rules="rules"
                        counter="4"
                        type="number"
                      ></v-text-field>
                    </v-col>
                  <v-col cols="1"></v-col>
                    <h3>New code:</h3>
                    <v-col cols="8">
                      <v-text-field
                        :rules="rules"
                        counter="4"
                        type="number"
                      ></v-text-field>
                  </v-col>
                  <v-row>
                    <v-col cols="4"></v-col>
                    <v-btn class="ma-2" outlined medium color="primary" @click="dialog=false">Cancel</v-btn>
                    <v-btn class="my-2" depressed meduim color="primary" @click="dialog=false">Save</v-btn>
                  </v-row> 
                </v-card>
              </v-dialog>
          </div>
        </v-expand-transition>
    </div>
  </v-card>
</template>

<script>
import TopCard from "@/components/devices/GenericTopCard.vue";
export default {
  components: {
    TopCard,
  },
  data: () => ({
    show:false,
    dialog:false,
    dialog2:false,
    rules: [v => v.length <= 4 || 'Max 4 characters'],
  }),
};
</script>