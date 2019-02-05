<template>
  <v-img
    :src="backgroundImg"
    class="page-vimg with-header"
  >
    <toolbar-simple></toolbar-simple>
    <v-container fill-height pa-0>
      <v-layout align-center>
        <v-flex xs12>
          <v-card
            class="text-xs-center margin-auto border-radius6 box-purple-500-glow elevation-10 card-center-box"
          >
            <v-img
              :src="backgroundImg"
            >
              <v-layout align-center justify-center row fill-height wrap>
                <v-flex xs12>
                  <div class="display-3 white--text" v-html="title"></div>
                  <Countdown :deadline="endDateFormated" :dark="true" class="my-2"></Countdown>
                  <p class="subheading white--text" v-html="description"></p>
                </v-flex>
                <v-flex xs12 class="text-xs-center px-5">
                  <p class="subheading secondary--text">Estimated recovery time is:</p>
                  <v-slider
                    :value="progress"
                    thumb-label
                    color="secondary"
                    step="10"
                    :label="progress + '%'"
                    snap
                    track-color="pink lighten-4"
                    thumb-color="secondary"
                    class="no-mrpd"
                  ></v-slider>
                </v-flex>
              </v-layout>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
</template>

<script>
  import ToolbarSimple from '@/layouts/FullPageSimple/Toolbar'
  import Countdown from '@/components/Elements/Countdown'
  import * as moment from 'moment'

  export default {
    data () {
      return {
        title: `Site is temporarily <br>unavailable`,
        description: `
          <span class="subheading">Scheduled maintenance is currently in progress. Please check back soon</span><br>
          <span class="subheading">We apologize for any inconvenience.</span>
        `,
        startDate: '2018-09-01',
        endDate: '2019-11-26'
      }
    },
    components: {
      ToolbarSimple,
      Countdown
    },
    computed: {
      backgroundImg () {
        return '/static/doc-images/HexesisMaterial01.png'
      },
      endDateFormated () {
        const utc = moment.utc(this.endDate)
        const local = moment(utc).local()
        return moment(local).format('MMMM D YYYY')
      },
      progress () {
        const utcStart = moment.utc(this.startDate)
        const start = moment(utcStart).local()

        const utcEnd = moment.utc(this.endDate)
        const end = moment(utcEnd).local()

        const today = moment().local()

        return Math.round(((today - start) / (end - start)) * 100)
      }
    }
  }
</script>
