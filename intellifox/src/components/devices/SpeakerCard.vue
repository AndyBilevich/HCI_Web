<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard 
        @set_switch_state="switchOnOff"
        :model="speaker"
        :switchState="switchState"
        :switchLoads="switchLoading"
        :switchLocked="switchLocked"
        :click="() => {show = !show}"
        :show="show" 
        :title="title" 
        :subtitle="desc" 
        icon="mdi-speaker"
      />
    </div>
    <div class="device_bottom_card">
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-row>  
              <v-col cols="1"></v-col>
              <v-col cols="6">
                <v-row class="align-self-center">
                  <v-slider
                    min="0"
                    :max="songDuration"
                    :value="playTime"
                    readonly
                  >
                    <template v-slot:prepend>
                      {{(speaker && speaker.state && speaker.state.song)?speaker.state.song.progress:"0:00"}}
                    </template>
                    <template v-slot:append>
                      {{(speaker && speaker.state && speaker.state.song)?speaker.state.song.duration:"0:00"}}
                    </template>
                  </v-slider>
                </v-row>

                <v-row class="align-center">            
                    <v-col cols="1"></v-col>
                    <v-btn :disabled="actionsLocked" icon x-large class="my-5">
                      <v-icon x-large>mdi-skip-previous</v-icon>
                    </v-btn>
                    <v-btn :disabled="actionsLocked" icon x-large class="ma-5" @click="switchPlay">
                      <v-icon x-large>{{play?'mdi-pause':'mdi-play'}}</v-icon>
                    </v-btn>
                    <v-btn :disabled="actionsLocked" icon x-large class="my-5">
                      <v-icon x-large>mdi-skip-next</v-icon>
                    </v-btn>
                </v-row>

              </v-col>

              <v-col cols="5">
                <v-row class="ml-5 align-center">         
                  <v-col :disabled="actionsLocked" cols="1"></v-col>
                  <v-btn :disabled="actionsLocked" icon>
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                  <p class="mt-1">Volume</p>
                  <v-btn icon>
                    <v-icon>mdi-chevron-up</v-icon>
                  </v-btn>
                </v-row>
                  <v-slider
                    :disabled="actionsLocked"
                    v-model="media"
                    vertical
                    value="100"
                    class="mr-3"
                  ></v-slider>
              </v-col>
                
            </v-row>

          </div>
        </v-expand-transition>
    </div>
  </v-card>
</template>

<script>
import { DeviceApi } from '@/api';
import TopCard from "@/components/devices/GenericTopCard.vue";
export default {
  props: {
    model: Object,
  },
  components: {
    TopCard,
  },
  mounted: function() {
    this.updateTitle();
    this.updateDesc();
    this.updateState();
    this.setPooling();
  },
  data: function() {
    return {
      pool:undefined,

      show:false,
      media:undefined,
      play:false,

      switchState:false,
      switchLoading:false,
      switchLocked:false,

      actionsLocked:false,

      title: '',
      desc: '',

      infoMessage: {
        status: {
          'playing': 'Playing',
          'stopped': 'Stopped',
          'paused': 'Paused',
        },
      },
    }
  },
  computed: {
    speaker: {
      get: function() {
        return this.model;
      },
      set: function(newModel) {
        this.$emit('upd_model', newModel);
      }
    },
    songDuration: { 
      get: function() {
        if (this.speaker && this.speaker.state && this.speaker.state.song) {
          const song = this.speaker.state.song;
          let duration = 0;
          song.duration.split(":").forEach(el => {
            duration *= 60;
            duration += parseInt(el);
          })
          return duration;
        }
        else
          return 1;
      }
    },
    playTime: {
      get: function() {
        if (this.speaker && this.speaker.state && this.speaker.state.song) {
          const song = this.speaker.state.song;
          let playtime = 0;
          song.progress.split(":").forEach(el => {
            playtime *= 60;
            playtime += parseInt(el);
          })
          return playtime;
        }
        else
          return 0;
      }
    }
  },
  methods: {
    setPooling: function() {
      this.pool = setInterval(this.updateDeviceState, 1000);
    },
    stopPooling: function() {
      clearInterval(this.pool);
    },
    updateDeviceState: async function() {
      const ans = await DeviceApi.getState(this.speaker.id);
      this.speaker.state = ans.result;

      this.updateDesc();
      this.updateState();
    },
    updateTitle: function() {
      this.title = this.speaker.name;
    },
    updateDesc: function() {
      const state = this.speaker.state;
      this.desc = this.getStatus(state.status);
      if (state.status !== 'stopped') {
        this.desc += ` - Volume: ${state.volume}`; 
        this.desc += ` - Genre: ${this.getGenre(state.genre)}`;
        this.desc += ` - Song: ${this.getSongInfo(state.song)}`;
      }
    },
    getStatus: function(status) {
        switch(status) {
          case 'stopped':
            return 'Stopped';
          case 'playing':
            return 'Playing';
          case 'paused':
            return 'Paused';
          default:
            return '';
        }
    },
    getGenre: function(genre) {
        switch(genre) {
          case 'classical':
            return 'Classical';
          case 'country':
            return 'Country';
          case 'dance':
            return 'Dance';
          case 'latina':
            return 'Latin';
          case 'pop':
            return 'Pop';
          case 'rock':
            return 'Rock';
          default:
            return '';
        }
    },
    getSongInfo: function(song) {
      return `${song.artist} - ${song.title} (Album: ${song.album})`
    },
    updateState: function() {
      this.switchState = this.speaker.state.status !== 'stopped';
      this.play = this.speaker.state.status === 'playing';
    },
    switchOnOff: async function(new_switch_state) {
      this.stopPooling();
      this.switchState = new_switch_state;
      this.switchLoading = true;
      this.switchLocked = true;
      await this.switchActions();
      this.switchLocked = false;
      this.switchLoading = false;
      this.setPooling();
    },
    switchActions: async function() {
      try {
        let ans;
        if (this.switchState)
          ans = await DeviceApi.setAction(this.speaker.id, 'play');
        else
          ans = await DeviceApi.setAction(this.speaker.id, 'stop');
        if (ans.result) {
          const ans2 = await DeviceApi.getState(this.speaker.id);
          this.speaker.state = ans2.result;
          this.updateTitle();
          this.updateDesc();
          this.updateState();
        } 
      } catch (err) {
        console.log(err);
      }
    },
    switchPlay: async function() {
      this.stopPooling();
      this.play = !this.play;
      this.actionsLocked = true;
      await this.switchPlayHandler();
      this.actionsLocked = false;
      this.setPooling();
    },
    switchPlayHandler: async function() {
      try {
        let ans;
        if (this.play)
          ans = await DeviceApi.setAction(this.speaker.id, 'resume');
        else
          ans = await DeviceApi.setAction(this.speaker.id, 'pause');
        if (ans.result) {
          const ans2 = await DeviceApi.getState(this.speaker.id);
          this.speaker.state = ans2.result;
          this.updateTitle();
          this.updateDesc();
          this.updateState();
        } 
      } catch (err) {
        console.log(err);
      }
    }
  },
  beforeDestroy: function() {
    this.stopPooling();
  }
};
</script>

<!-- <v-sheet class="top_card"> 
        <span class="device_icon_frame">
          <v-icon>mdi-speaker</v-icon>
        </span>
        <span class="device_info_frame">
          <div class="info_top_frame">
            <span>
              {{speaker-name}}
            </span>
            <span>
              <v-icon>flechita</v-icon>
            </span>
          </div>
          <div class="info_bottom_frame">
            {{playing}}
          </div>
        </span>
        <span class="device_interaction_frame">
          <span class="heart_icon"><v-icon>heart</v-icon></span>
          <span class="play_icon"><v-icon>play</v-icon></span>
          <span class="overflow_icon"><v-icon>july3puntitos</v-icon></span>
        </span>
</v-sheet> -->