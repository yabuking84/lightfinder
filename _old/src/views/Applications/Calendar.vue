<template>
  <v-content>
    <v-parallax
      src="/static/doc-images/vbanner.jpg"
      height="150">
      <v-layout row align-start class="py-4" wrap>
        <v-flex xs6>
          <v-layout row wrap align-center>
            <v-flex xs12>
              <v-toolbar color="transparent" dark flat>
                <v-btn icon @click="prev">
                  <v-icon>today</v-icon>
                </v-btn>
                <v-toolbar-title class="headline ml-0">Calendar</v-toolbar-title>
              </v-toolbar>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs6>
          <v-layout row wrap>
            <v-flex xs12 no-wrap class="text-xs-center text-md-right">
              <v-tooltip bottom>
                <v-btn icon
                  slot="activator"
                  class="mx-0"
                  @click.native="today"
                >
                  <v-icon color="white">today</v-icon>
                </v-btn>
                <span>Today</span>
              </v-tooltip>
              <v-tooltip bottom>
                <v-btn icon
                  slot="activator"
                  class="mx-0"
                  @click.native="changeView('basicDay')"
                >
                  <v-icon color="white">view_day</v-icon>
                </v-btn>
                <span>Basic Day</span>
              </v-tooltip>
              <v-tooltip bottom>
                <v-btn icon
                  slot="activator"
                  class="mx-0"
                  @click.native="changeView('basicWeek')"
                >
                  <v-icon color="white">view_week</v-icon>
                </v-btn>
                <span>Week</span>
              </v-tooltip>
              <v-tooltip bottom>
                <v-btn icon
                  slot="activator"
                  class="ml-0"
                  @click.native="changeView('month')"
                >
                  <v-icon color="white">view_module</v-icon>
                </v-btn>
                <span>Month</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-layout column wrap align-center>
            <v-flex xs12>
              <v-toolbar color="transparent" dark flat>
                <v-btn icon @click="prev">
                  <v-icon>navigate_before</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title>{{currentDate}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="next">
                  <v-icon>navigate_next</v-icon>
                </v-btn>
              </v-toolbar>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-parallax>
    <v-container fluid grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card flat class="card--flex-toolbar app-calendar" :style="{ height: heightSet + 'px' }">
            <v-card-text v-vuse-scrollbar class="no-mrpd">
              <full-calendar :events="events"
                :config="config"
                @event-selected="eventClick"
                ref="calendar"></full-calendar>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-model="dialog.visible" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xl>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Title" required v-model="selectedEvent.title"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-menu
                  lazy
                  :close-on-content-click="false"
                  v-model="dialog.startDateMenu"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-right="40"
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    label="Start Date"
                    v-model="dialog.formattedStart"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="selectedEvent.start" @input="dialog.formattedStart = formatDate($event)" no-title scrollable actions>
                    <template slot-scope="{ save, cancel }">
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                        <v-btn flat color="primary" @click="save">OK</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-menu>
              </v-flex>

              <v-flex xs12 sm6>
                <v-menu
                  lazy
                  :close-on-content-click="false"
                  v-model="dialog.endDateMenu"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-right="40"
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    label="End Date"
                    v-model="dialog.formattedEnd"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="selectedEvent.end" @input="dialog.formattedEnd = formatDate($event)" no-title scrollable actions>
                    <template slot-scope="{ save, cancel }">
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                        <v-btn flat color="primary" @click="save">OK</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-menu>
              </v-flex>

              <v-flex xs12>

              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog.visible = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="updateEvent">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
  import { find, some, isEmpty } from 'lodash'
  import { FullCalendar } from 'vue-full-calendar'
  import ResizeMixin from '@/mixins/ResizeMixin'

  export default {
    mixins: [ResizeMixin],
    components: {
      FullCalendar
    },
    mounted () {
      this.getMydate()
    },
    data () {
      return {
        currentDate: null,
        dialog: {
          visible: false,
          formattedStart: null,
          formattedEnd: null,
          startDateMenu: false,
          endDateMenu: false
        },
        config: {
          defaultView: 'month',
          weekends: true,
          editable: true,
          header: {
            left: '',
            center: '',
            right: ''
          },
          dayNamesShort: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        },
        events: [
          {
            id: 1,
            title: 'Edit me',
            start: '2017-12-05',
            color: '#257e4a'
          },
          {
            id: 2,
            title: 'event1',
            start: '2018-01-01',
            constraint: 'availableForMeeting', // defined below
            color: '#257e4a'
          },
          {
            id: 3,
            title: 'event2',
            start: '2017-12-12',
            end: '2017-12-29'
          },
          {
            id: 4,
            title: 'event3',
            start: '2017-12-03',
            allDay: false
          },
          {
            id: 5,
            start: '2017-11-24',
            end: '2017-11-28',
            overlap: false,
            rendering: 'background',
            color: '#ff9f89'
          },
          {
            id: 6,
            start: '2017-11-06',
            end: '2017-11-08',
            overlap: false,
            rendering: 'background',
            color: '#ff9f89'
          }
        ],
        selectedEvent: {
          start: null,
          end: null
        }
      }
    },
    methods: {
      formatDate (date) {
        if (!date) {
          return null
        }

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) {
          return null
        }

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      prev () {
        this.$refs.calendar.fireMethod('prev')
        this.getMydate()
      },
      next () {
        this.$refs.calendar.fireMethod('next')
        this.getMydate()
      },
      today () {
        this.$refs.calendar.fireMethod('today')
        this.getMydate()
      },
      changeView (view) {
        this.$refs.calendar.fireMethod('changeView', view)
        this.getMydate()
      },
      refreshEvents () {
        this.$refs.calendar.$emit('refetch-events')
      },
      getMydate () {
        const view = this.$refs.calendar.fireMethod('getView')
        this.currentDate = view.title
      },
      eventClick (fcEvent) {
        const eventID = fcEvent.id
        this.selectedEvent = find(this.events, {id: eventID})
        if (!some(this.selectedEvent.start, isEmpty)) {
          this.dialog.formattedStart = this.formatDate(this.selectedEvent.start)
        }
        if (!some(this.selectedEvent.end, isEmpty)) {
          this.dialog.formattedEnd = this.formatDate(this.selectedEvent.end)
        }
        this.dialog.visible = !this.dialog.visible
      },
      updateEvent () {
        this.dialog.visible = !this.dialog.visible
        console.log(this.selectedEvent)
        // Your ajax to save event data
      }
    },
    computed: {
      heightSet () {
        return this.height - 300
      }
    }
  }
</script>
