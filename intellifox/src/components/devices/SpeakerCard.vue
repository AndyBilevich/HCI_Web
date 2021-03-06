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
                <v-row class="d-flex justify-center">
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

                <v-row class="d-flex justify-center">
                  <v-btn :disabled="actionsLocked" icon x-large @click="() => songQuery({action: {name: 'setSong', type: 'previousSong'}, value: 1})">
                    <v-icon x-large>mdi-skip-previous</v-icon>
                  </v-btn>
                  <v-btn :disabled="actionsLocked" icon x-large @click="switchPlay">
                    <v-icon x-large>{{play?'mdi-pause':'mdi-play'}}</v-icon>
                  </v-btn>
                  <v-btn :disabled="actionsLocked" icon x-large @click="() => songQuery({action: {name: 'setSong', type: 'nextSong'}, value: 1})">
                    <v-icon x-large>mdi-skip-next</v-icon>
                  </v-btn>                   
                </v-row>

                <v-row class="d-flex justify-center">
                  
                </v-row>
                <v-row class="d-flex justify-center">
                  <v-col>
                    <p>Genre</p>
                    <v-row class="d-flex justify-center">
                      <v-overflow-btn
                        v-model="genreIndex"
                        :disabled="actionsLocked"
                        :items="genres"
                        background-color="background2"
                        solo
                      />
                    </v-row>
                  </v-col>
                </v-row>
                <v-row class="d-flex justify-center">
                  <p>Select Song from Playlist</p>
                </v-row>
                <v-row class="d-flex justify-center">
                    <v-btn
                      class="cards background2--text"
                      :disabled="actionsLocked"
                      @click="clickOnPlaylist"
                    >
                      Playlist
                    </v-btn>
                    <v-overlay
                      v-model="showingPlaylist"
                      scrollable
                    >
                      <v-card>
                        <v-list
                          dense
                        >
                          <v-row>
                            <v-col class="mr-auto">
                              <v-subheader class="ml-5">PLAYLIST</v-subheader>
                            </v-col>
                            <v-col cols="auto">
                              <v-btn
                                top
                                right
                                icon
                                class="mr-5"
                                @click="showingPlaylist = false"
                              >
                                <v-icon>mdi-window-close</v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                          <v-list-item-group v-model="songIndex" color="primary">
                            <v-list-item
                              :disabled="actionsLocked"
                              v-for="(song, i) in playlist"
                              :key="i"
                            >
                              <v-list-item-icon>
                                <v-icon>mdi-music</v-icon>
                              </v-list-item-icon>
                              <v-list-item-content>
                                 {{`${song.artist} - ${song.title} (Album: ${song.album}) (${song.duration})`}}
                              </v-list-item-content>
                            </v-list-item>
                          </v-list-item-group>   
                        </v-list>
                      </v-card>
                    </v-overlay>
                </v-row>

              </v-col>

              <v-layout row wrap align-center>
                <v-col>
                  <v-row class="d-flex justify-center">
                    <v-btn
                      :disabled="actionsLocked" 
                      icon
                      @click="() => {
                        if (volume < 10)
                          songQuery({action: {name: 'setVolume'}, value: volume + 1});
                      }" 
                    >
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <p class="mt-1">Volume</p>
                    <v-btn 
                      :disabled="actionsLocked" 
                      icon
                      @click="() => {
                        if (volume > 0)
                          songQuery({action: {name: 'setVolume'}, value: volume - 1});
                      }"
                    >
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                  </v-row>
                  <v-row>
                    <v-slider
                      :disabled="actionsLocked"
                      v-model="volume"
                      @mousedown="editingVolume = true"
                      @click="() => {
                        editingVolume = false;
                        songQuery({action: {name: 'setVolume'}, value: volume});
                        }"
                      min="0"
                      max="10"
                      vertical
                    >
                      <template v-slot:prepend>
                        {{volume}}
                      </template>
                      <template v-slot:append>
                        {{10}}
                      </template>
                    </v-slider>
                  </v-row>
                </v-col>
              </v-layout>
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
  mounted: async function() {
    this.updateTitle();
    await this.updateState();
    this.updateDesc();
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
      showingPlaylist:false,
      playlist:undefined,

      lastSongIndex:undefined,
      songIndex:undefined,

      lastGenreIndex:undefined,
      genreIndex:undefined,

      genres:[
        {
          value: 0,
          id: 'classical',
          text: 'Classical',
        },
        {
          value: 1,
          id: 'country',
          text: 'Country',
        },
        {
          value: 2,
          id: 'dance',
          text: 'Dance',
        },
        {
          value: 3,
          id: 'latina',
          text: 'Latin',
        },
        {
          value: 4,
          id: 'pop',
          text: 'Pop',
        },
        {
          value: 5,
          id: 'rock',
          text: 'Rock',
        }
      ],

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
    updateDevice: async function(data) {
      this.stopUpdating();
      switch(data.event) {
        case 'statusChanged':
          this.speaker.state.status = data.args.newStatus;
          break;
        case 'volumeChanged':
          this.speaker.state.volume = data.args.newVolume;
          break;
        case 'songChanged':
          this.speaker.state.song = data.args.newSong;
          break;
        default:
          return;
      }
      await this.updateState();
      this.updateDesc();      
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

      await this.updateState(); 
      this.updateDesc();
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
        this.desc += ` - Genre: ${(this.genres && this.genreIndex)?(this.genres[this.genreIndex].text):''}`;
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
    getSongInfo: function(song) {
      return `${song.artist} - ${song.title} (Album: ${song.album})`
    },
    updateState: async function() {
      this.switchState = this.speaker.state.status !== 'stopped';
      this.play = this.speaker.state.status === 'playing';
      if (!this.editingVolume)
        this.volume = parseInt(this.speaker.state.volume);
      if (this.play) {
        if (this.genres)  
          this.lastGenreIndex = this.genreIndex = this.genres.map((x, i) => [i, x]).filter(x => x[1].id == this.speaker.state.genre)[0][0];
      }
      if (this.showingPlaylist) {
        await this.fetchPlaylist();
        if (this.playlist)
          this.lastSongIndex = this.songIndex = this.playlist.map((x, i) => [i, x]).filter(x => x[1].title == this.speaker.state.song.title)[0][0];      
      }
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
        } 
      } catch (err) {
        console.log(err);
      }
      await this.updateState();
      this.updateDesc();
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
        } 
      } catch (err) {
        console.log(err);
      }
      await this.updateState();
      this.updateDesc();
    },
    songQuery: async function(data) {
      const {action, value} = data;
      this.stopUpdating();
      this.actionsLocked = true;
      if (action.name === 'setSong')
        await this.setSongHandler(action.type, value);
      else if (action.name === 'setVolume')
        await this.setVolumeHandler(value);
      else if (action.name === 'setGenre')
        await this.setGenreHandler(value);
      this.actionsLocked = false;
      this.startUpdating();
    },
    setSongHandler: async function(toSong, times) {
      if (toSong === 'previousSong' || toSong === 'nextSong') {
        try {
          let ans;
          let i;
          for(i = 0; i < times; i++)
            ans = await DeviceApi.setAction(this.speaker.id, toSong);

          if (ans.result) {
            const ans2 = await DeviceApi.getState(this.speaker.id);
            this.speaker.state = ans2.result;
          }
        } catch (err) {
          console.log(err);
        }
        await this.updateState();
        this.updateDesc();
      }
    },
    setVolumeHandler: async function(newVolume) {
      try {
        const ans = await DeviceApi.setAction(this.speaker.id, 'setVolume', [newVolume.toString()]);
        if (ans.result) {
          const ans2 = await DeviceApi.getState(this.speaker.id);
          this.speaker.state = ans2.result;
        }
      } catch (err) {
        console.log(err);
      }
      await this.updateState();
      this.updateDesc();
    },
    setGenreHandler: async function(newGenre) {
      try {
        const ans = await DeviceApi.setAction(this.speaker.id, 'setGenre', [newGenre]);
        if (ans.result) {
          const ans2 = await DeviceApi.getState(this.speaker.id);
          this.speaker.state = ans2.result;
        }
      } catch (err) {
        console.log(err);
      }
      await this.updateState();
      this.updateDesc();
    },
    fetchPlaylist: async function() {
      try {
        const ans = await DeviceApi.setAction(this.speaker.id,'getPlaylist');
        if (ans) {
          this.playlist = [];
          this.playlist = ans.result;
        }
      } catch (err) {
        console.log(err);
      }
    },
    clickOnPlaylist: async function() {
      await this.fetchPlaylist();
      this.showingPlaylist = true;
    },
    emitUpdDevs: async function(){
      this.$emit('upd_devs');
    }
  },
  beforeDestroy: function() {
    this.stopUpdating();
  },
  watch: {
    genreIndex: async function() {
      if (this.genreIndex !== this.lastGenreIndex)
        this.songQuery({action: {name: 'setGenre'}, value: this.genres[this.genreIndex].id});
    },
    songIndex: async function() {
      const dif = this.songIndex - this.lastSongIndex;
      if (dif > 0)
        this.songQuery({action: {name: 'setSong', type: 'nextSong'}, value: dif});
      else if (dif < 0)
        this.songQuery({action: {name: 'setSong', type: 'previousSong'}, value: -dif}); 
    }
  }
};
</script>