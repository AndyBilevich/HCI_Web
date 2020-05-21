<template>
    <div>
        <v-card 
            class="card cards text-center" 
            height="170px" 
            width="170px"
            @click="dialog= true"
        >
            <v-icon
                size="130" 
                class="background2--text ma-5"
            >
            {{rooms_icons[selectedIconID]}}
            </v-icon>
        </v-card>

        <v-dialog v-model="dialog" max-width="600px" >
            <v-card color="background3">
                <v-container>
                     <v-row align="center">
                        <v-col v-for="(ico, idx) in rooms_icons" :key="idx" align="center">
                        <v-card 
                            :key="idx" 
                            @click.native="() => {selectedIconID = idx;}"
                            @click="dialog=false"
                            class="cards"
                            height="170px" 
                            width="170px"
                        >
                            <v-icon 
                                size="130" 
                                class="background2--text ma-5"
                            >
                                {{ico}}
                            </v-icon>   
                        </v-card>
                    </v-col>
                </v-row>       
                </v-container>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
export default {
    data: () => ({
        hidden: false,
        dialog: false,
        selectedIconID: 0,
        rooms_icons: [
            "mdi-rhombus-split",            
            "mdi-bed-outline",
            "mdi-shower",
            "mdi-flower-tulip-outline",
            "mdi-table-chair",
            "mdi-silverware-fork-knife"
        ]
    }),
    props: {
        id: String,
        icon: String,
    },
    watch: {
        selectedIconID: function(new_val) {
            this.$emit('upd_icon', this.rooms_icons[new_val]);
        }
    }

  }
</script>


 
<style scoped>
  .card {
    margin: 20px;
    cursor: pointer;
  }
</style>