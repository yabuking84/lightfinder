<template>
  <div>
    <v-img
      src="/static/doc-images/HexesisMaterial01.png"
      height="250"
      class="pos-relative overflow-initial"
    >
      <v-btn
        absolute
        dark
        fab
        :class="['pos-left-110px', 'pos-bottom-0px', 'hidden-sm-and-down']"
      >
        <v-avatar
          size="100"
          color="grey lighten-4"
        >
          <img :src="authUser.avatar" alt="Alice">
        </v-avatar>
      </v-btn>
      <v-parallax height="250" class="hidden-md-and-up">
        <v-layout row wrap class="mx-3 py-2">
          <v-flex xs7 class="pa-0">
            <div class="headline">{{authUser.name}}</div>
            <p class="mb-0">CTO of Vuse</v-rating></p>
          </v-flex>
          <v-flex xs5 class="text-xs-right pa-0">
            <v-btn fab small color="secondary">
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn fab small color="blue" dark>
              <v-icon>message</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12 class="text-xs-center">
            <v-avatar size="100">
              <img :src="authUser.avatar" alt="John">
            </v-avatar>
          </v-flex>
        </v-layout>
      </v-parallax>
    </v-img>
    <!-- Section #1 -->
    <v-container fluid grid-list-xl class="no-mrpd">
      <v-layout row wrap ma-0>
        <v-flex class="left-section pa-0" :hidden-sm-and-down="aboutPageVisibility">
          <about :ratings="ratings" :about="about"></about>
        </v-flex>
        <!-- BLue -->
        <v-flex class="mid-section">
          <v-layout row wrap>
            <v-flex xs12 class="pa-0 sec-margin" hidden-sm-and-down>
              <v-card color="" flat>
                <v-layout row wrap fill-height align-center justify-center class="mx-3 py-2">
                  <v-flex xs7 class="pa-0">
                    <div class="headline">{{authUser.name}}</div>
                    <p class="mb-0">CTO of Vuse</v-rating></p>
                  </v-flex>
                  <v-flex xs5 class="text-xs-right pa-0">
                    <v-btn color="secondary">
                      <v-icon left>add</v-icon> Request
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex xs12 class="pa-0 white">
              <v-toolbar color="transparent" flat class="content-px0">
                <v-tabs
                  v-model="tab"
                  color="transparent"
                  light
                >
                  <v-tabs-slider color="secondary"></v-tabs-slider>

                  <v-tab v-for="item in tabs" :key="item">
                    {{ item }}
                  </v-tab>
                </v-tabs>
                <v-spacer></v-spacer>
                <v-toolbar-items class="hidden-md-and-up">
                  <v-btn flat icon @click="showAbout"><v-icon>vertical_align_bottom</v-icon></v-btn>
                </v-toolbar-items>
              </v-toolbar>

              <v-tabs-items v-model="tab">
                <v-tab-item
                  v-for="(tab, i) in tabs"
                  :key="i"
                  :id="tab + '-' + i"
                >
                  <component :is="tab"></component>
                </v-tab-item>
              </v-tabs-items>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import { rgba as rgbaGradients } from '@/data/gradients'
  import ProfileComponents from '@/views/Pages/ProfileComponents'
  import {authUser} from '@/data/dummyData'

  export default {
    components: {
      ...ProfileComponents
    },
    data () {
      return {
        tabs: ['Feeds', 'Info', 'Media'],
        about: {
          private: false,
          visibility: true,
          followers: 500,
          followings: 300,
          interests: ['Music', 'Movie', 'Table-Tennis', 'Reading', 'Dancing', 'Gaming'],
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          followEvent: this.followEventHandler,
          messageEvent: this.messageEventHandler
        },
        gradient: rgbaGradients[8].gradient,
        authUser,
        ratings: 4,
        tab: null
      }
    },
    methods: {
      followEventHandler () {
        console.log('Follow Event Handler')
      },
      messageEventHandler () {
        console.log('Message Event Handler')
      },
      showAbout () {
        this.about.visibility = !this.about.visibility
      }
    },
    computed: {
      aboutPageVisibility () {
        return this.about.visibility
      }
    },
    watch: {
      '$vuetify.breakpoint.smAndDown' (from, to) {
        this.about.visibility = from
      }
    }
  }
</script>

<style lang="stylus" scoped>
.left-section
  width: 260px
.mid-section
  width: calc(100% - 284px)
.sec-margin
  margin-top: -14px
// .section-400px
//   width: 400px
// .section-400px-off
//   width: calc(100% - 400px)
@media screen and (max-width: 960px)
  .left-section
    width: 100%
  .mid-section
    width: 100%
  .sec-margin
    margin-top: 0px
</style>
