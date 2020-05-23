<template> 
  <v-card class="device_card">
    <div class="device_top_card">
      <TopCard 
        @set_switch_state="switchOnOff"
        @upd_devs="emitUpdDevs"
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
            <v-row class="mt-2"> 
              <v-col cols="1"></v-col>
              <v-col cols="6">
                <v-row>
                  <v-col class="justify-center">
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
                  </v-col>
                </v-row>

                <v-row>
                    <v-col>
                      <v-btn :disabled="actionsLocked" icon x-large @click="() => changeSong('previousSong')">
                        <v-icon x-large>mdi-skip-previous</v-icon>
                      </v-btn>
                      <v-btn :disabled="actionsLocked" icon x-large @click="switchPlay">
                        <v-icon x-large>{{play?'mdi-pause':'mdi-play'}}</v-icon>
                      </v-btn>
                      <v-btn :disabled="actionsLocked" icon x-large @click="() => changeSong('nextSong')">
                        <v-icon x-large>mdi-skip-next</v-icon>
                      </v-btn>
                    </v-col>                     
                </v-row>

              </v-col>

              <v-col class="justify-center" cols="5">
                <v-row class="d-flex justify-center">
                  <v-btn :disabled="actionsLocked" icon>
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                  <p class="mt-1">Volume</p>
                  <v-btn :disabled="actionsLocked" icon>
                    <v-icon>mdi-chevron-up</v-icon>
                  </v-btn>
                </v-row>
                <v-slider
                  :disabled="actionsLocked"
                  v-model="volume"
                  v-on:mousedown="editingVolume = true"
                  v-on:mouseup="() => {
                    changeVolume(volume);
                    editingVolume = false;
                    }"
                  min="0"
                  max="10"
                  vertical
                />
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
    this.startUpdating();
  },
  data: function() {
    return {
      source:undefined,
      pool:undefined,

      show:false,
      media:undefined,
      play:undefined,
      editingVolume:false,
      volume:undefined,

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
    startUpdating: function() {
      if (this.play) {
        this.setPooling();
      }
      else {
        this.subscribeToEvents();
      }
    },
    stopUpdating: function() {
      this.unsubscribeToEvents();
      this.stopPooling();
    },
    subscribeCallback: async function(event) {
      const data = await JSON.parse(event.data);
      this.updateDevice(data);
    },
    subscribeToEvents: function() {
      if (!this.source) {
        if (!EventSource) {
          alert('Sorry, your browser does not support server-sent events.');
          return;
        }
        this.source = new EventSource(`${DeviceApi.url}/${this.speaker.id}/events`);
        this.source.addEventListener('message', this.subscribeCallback, false);
      }
    },
    unsubscribeToEvents: function() {
      if (this.source) {
        this.source.removeEventListener('message', this.subscribeCallback);
        this.source.close();
        this.source = undefined;
      }
    },
    updateDevice: function(data) {
      this.stopUpdating();
      switch(data.event) {
        case 'statusChanged':
          this.speaker.state.status = data.args.newStatus;
          break;
        case 'lockChanged':
          //this.speaker.state.lock = data.args.newLock;
          break;
        default:
          return;
      }
      this.updateDesc();
      this.updateState();
      this.startUpdating();
    },
    setPooling: function() {
      if (!this.pool) {
        this.pool = setInterval(this.updateDeviceState, 1000);
      }
    },
    stopPooling: function() {
      if (this.pool) {
        clearInterval(this.pool);
        this.pool = undefined;
      }
    },
    updateDeviceState: async function() {
      this.stopUpdating();
      const ans = await DeviceApi.getState(this.speaker.id);
      this.speaker.state = ans.result;

      this.updateDesc();
      this.updateState();
      this.startUpdating();
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
      if (!this.editingVolume)
        this.volume = parseInt(this.speaker.state.volume);
    },
    switchOnOff: async function(new_switch_state) {
      this.stopUpdating();
      this.switchState = new_switch_state;
      this.switchLoading = true;
      this.switchLocked = true;
      await this.switchActions();
      this.switchLocked = false;
      this.switchLoading = false;
      this.startUpdating();
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
          this.updateDesc();
          this.updateState();
        } 
      } catch (err) {
        console.log(err);
      }
    },
    switchPlay: async function() {
      this.stopUpdating();
      this.play = !this.play;
      this.actionsLocked = true;
      await this.switchPlayHandler();
      this.actionsLocked = false;
      this.startUpdating();
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
          this.updateDesc();
          this.updateState();
        } 
      } catch (err) {
        console.log(err);
      }
    },
    songQuery: async function(data) {
      const {action, value} = data;
      this.stopUpdating();
      this.actionsLocked = true;
      if (action.name === 'setSong')
        await this.setSongHandler(action.type);
      else if (action.name === 'setVol')
        await this.setVolumeHandler(value);
      this.actionsLocked = false;
      this.startUpdating();
    },
    setSongHandler: async function(toSong) {
      if (toSong === 'previousSong' || toSong === 'nextSong') {
        try {
          const ans = await DeviceApi.setAction(this.speaker.id, toSong);
          if (ans.result) {
            const ans2 = await DeviceApi.getState(this.speaker.id);
            this.speaker.state = ans2.result;
            this.updateDesc();
            this.updateState();
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    setVolumeHandler: async function(newVolume) {
        try {
          const ans = await DeviceApi.setAction(this.speaker.id, 'setVolume', [newVolume]);
          if (ans.result) {
            const ans2 = await DeviceApi.getState(this.speaker.id);
            this.speaker.state = ans2.result;
            this.updateDesc();
            this.updateState();
          }
        } catch (err) {
          console.log(err);
        }
    },
    emitUpdDevs: async function(){
      this.$emit('upd_devs');
    }
  },
  beforeDestroy: function() {
    this.stopUpdating();
  }
};
</script>