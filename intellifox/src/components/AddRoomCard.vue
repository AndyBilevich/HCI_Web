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
                v-if="selectedIconID == '1'"
            >
                mdi-bed-outline
            </v-icon>
            <v-icon 
                size="130" 
                class="background2--text ma-5"
                v-else-if="selectedIconID == '2'"
            >
                mdi-shower
            </v-icon>
            <v-icon 
                size="130" 
                class="background2--text ma-5"
                v-else-if="selectedIconID == '3'"
            >
                mdi-flower-tulip-outline
            </v-icon>
            <v-icon 
                size="130" 
                class="background2--text ma-5"
                v-else-if="selectedIconID == '4'"
            >
                mdi-table-chair
            </v-icon>
            <v-icon 
                size="130" 
                class="background2--text ma-5"
                v-else-if="selectedIconID == '5'"
            >
               mdi-silverware-fork-knife
            </v-icon>
            <v-icon 
                size="130" 
                class="background2--text ma-5"
                v-else
            >
               mdi-rhombus-split
            </v-icon>
        </v-card>

        <v-dialog v-model="dialog" max-width="600px" >
            <v-card color="background3">
                <v-container>
                     <v-row align="center">
                        <v-col v-for="r in rooms" :key="r.id" align="center">
                        <v-card 
                            :key="r.id" 
                            @click.native="() => {selectedIconID = r.id;}"
                            @click="dialog=false"
                            class="cards"
                            height="170px" 
                            width="170px"
                        >
                            <v-icon 
                                size="130" 
                                class="background2--text ma-5"
                            >
                                {{r.icon}}
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
        rooms: [
            {
            id: 0,
            icon: "mdi-rhombus-split"
            },
            {
            id: 1,
            icon: "mdi-bed-outline"
            },
            {
            id: 2,
            icon: "mdi-shower"
            },
            {
            id: 3,
            icon: "mdi-flower-tulip-outline"
            },
            {
            id: 4,
            icon: "mdi-table-chair"
            },
            {
            id: 5,
            icon: "mdi-silverware-fork-knife"
            },
        ]
    }),
    props: {
        id: String,
        icon: String,
    }

  }
</script>


 
<style scoped>
  .card {
    margin: 20px;
    cursor: pointer;
  }
</style>