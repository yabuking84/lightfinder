<template>
    <div>
      <v-container fluid grid-list-xl class="pb-0">
        <v-toolbar flat class="transparent section-definition-toolbar mb-3">
          <v-avatar class="box-glow" tile>
            <v-icon dark>message</v-icon>
          </v-avatar>
          <v-toolbar-title class="primary--text hidden-xs-only">{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            color="white"
            v-model="search"
            label="Search User"
            solo
            append-icon="search"
            class="max-width-300x"
          ></v-text-field>
          <!-- <v-list dense class="text-xs-right max-width-250x">
            <v-list-tile>
              <v-list-tile-avatar>
                <v-avatar
                  size="40px"
                  color="grey lighten-4"
                  class="ml-2"
                >
                  <img :src="authUser.avatar" alt="avatar">
                </v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="authUser.name" class="subheading"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list> -->
        </v-toolbar>
        <v-navigation-drawer
          hide-overlay
          v-model="drawerinternal"
          :permanent="$vuetify.breakpoint.mdAndUp"
          enable-resize-watcher
          :mini-variant="$vuetify.breakpoint.smAndDown"
          :temporary="$vuetify.breakpoint.smAndDown"
          class="chat-nav-drawer"
          floating
        >
          <v-list two-line class="pt-0 inner-sidebar v-menu-trans-list-npd">
            <template v-for="(group, index) in filteredGroup">
              <v-list-tile
                @click="switchGroup(group)" :key="`member-${index}-${group.user.id}`"
                :class="[ group.id === activeGroupId ? 'box-glow' : '']"
              >
                <v-list-tile-avatar>
                  <v-badge overlap :color="group.user.status.color" v-if="group.user.status">
                    <v-icon slot="badge" dark small>{{ group.user.status.icon }}</v-icon>
                    <v-avatar
                      size="40px"
                    >
                      <img :src="group.user.avatar" alt="avatar">
                    </v-avatar>
                  </v-badge>
                  <img :src="group.user.avatar" v-else>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ group.user.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ group.last_message }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action class="compact-action">
                  <v-btn color="primary" fab class="btn-round-xs" v-if="group.unread > 0">{{ group.unread }}</v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < groups.length" :key="index"></v-divider>
            </template>
          </v-list>
        </v-navigation-drawer>
        <!-- Messaging Section -->
        <v-layout row  class="chat-section">
          <v-flex xs12 pr-0 pt-0 v-bind:pl-0="$vuetify.breakpoint.smAndDown">
            <v-toolbar card>
              <v-toolbar-side-icon @click.stop="drawerinternal = !drawerinternal" class="hidden-md-and-up"></v-toolbar-side-icon>
              <v-avatar
                size="40px"
                color="grey lighten-4"
                class="ml-2"
              >
                <img :src="activeGroup.user.avatar" alt="avatar">
              </v-avatar>
              <v-toolbar-title class="">{{ activeGroup.user.name }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <!-- Chat theme -->
              <v-menu
                offset-y
                left
                :close-on-content-click=false
                min-width="260"
                max-width="260"
                content-class="chat-theme"
              >
                <v-tooltip bottom slot="activator" class="mx-0" color="tooltipcolor">
                  <v-btn
                    icon
                    class="mx-0"
                    slot="activator"
                  >
                    <v-icon class="bold-weight">brush</v-icon>
                  </v-btn>
                  <span v-text="$t('labels.changeBackground')"></span>
                </v-tooltip>
                <v-card flat>
                  <v-toolbar color="primary" dense flat>
                    <v-spacer></v-spacer>
                    <v-toolbar-title class="an-15 white--text medium-text" v-text="$t('labels.changeBackground')"></v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-container fluid pa-0 grid-list-xs>
                    <v-layout row wrap>
                      <v-flex xs3
                        class="cursor-pointer"
                        v-for="(gradientItem, i) in gradientsList" :key="`gradientItem-${i}`"
                        @click="changeChatBackground(gradientItem)">
                        <v-img :gradient="gradientItem.gradient" :dark="gradientItem.isDark" height="50px" :src="backgroundImg" aspect-ratio="1">
                          <v-layout align-center justify-center row fill-height>
                            <v-flex text-xs-center>
                              <v-icon v-if="chatGradient === gradientItem">check_circle</v-icon>
                              <div :style="{'height': '50px'}" v-else></div>
                            </v-flex>
                          </v-layout>
                        </v-img>
                        <!-- <img class="image" :src="`https://randomuser.me/api/portraits/women/${i + 5}.jpg`" alt="lorem" width="77" height="55"> -->
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-menu>
              <!-- User infor -->
              <v-menu
                offset-y
                left
                :close-on-content-click=false
                min-width="260"
                max-width="260"
              >
                <v-tooltip bottom slot="activator" class="mx-0" color="tooltipcolor">
                  <v-btn
                    icon
                    class="mx-0"
                    slot="activator"
                  >
                    <v-icon class="bold-weight">more_vert</v-icon>
                  </v-btn>
                  <span v-text="$t('labels.contactInfo')"></span>
                </v-tooltip>
                <v-card flat>
                  <v-toolbar color="primary" dense flat>
                    <v-spacer></v-spacer>
                    <v-toolbar-title class="an-15 white--text medium-text" v-text="$t('labels.contactInfo')"></v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-container fluid pa-0>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-card flat>
                          <v-img
                            src="/static/doc-images/cards/sunshine.jpg"
                            height="200px"
                          >
                          </v-img>
                          <v-card-title primary-title>
                            <div>
                              <div class="headline">{{ activeGroup.user.name }}</div>
                              <span class="grey--text">{{ activeGroup.user.mood }}</span>
                            </div>
                          </v-card-title>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-menu>
            </v-toolbar>
            <v-divider></v-divider>
            <!-- Chat Background Container -->
            <!-- Chat Background Container -->
            <v-img
              :src="backgroundImg"
              :gradient="chatGradient.gradient"
              class="chat-messaging-section"
            >
              <v-card flat color="transparent" class="chatscroll-statesetter" id="chatscrollstatesetter" ref="chatscrollstatesetter">
                <v-card-text
                  class="transparent"
                  id="chatscroll-thread"
                >
                  <v-layout row wrap>
                    <v-flex xs12 v-for="(thread, index) in chat" :key="index">
                      <v-card flat class="overflow-hidden transparent">
                        <v-container fluid grid-list-xs>
                          <div class="chat-thread" :class="[authUser.id === thread.user.id ? 'end' : 'start']">
                            <div class="user-avatar">
                              <v-avatar
                                size="40px"
                                color="grey lighten-4"
                              >
                                <img :src="thread.user.avatar" alt="avatar">
                              </v-avatar>
                            </div>
                            <div class="chat-message pa-2 border-radius6">
                              <div class="body-2">{{ thread.user.name }}</div>
                              <div v-html="thread.message" class="chat-thread-message dont-break-out"></div>
                            </div>
                          </div>
                        </v-container>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-img>
            <v-layout row wrap class="no-mrpd">
              <v-flex xs12 class="no-mrpd">
                <div class="pos-relative vuse-chat-message-container">
                  <chat-editable
                    @update="chatMessageEditor = $event"
                    class="chat-message-editor"
                    type="innerHTML"
                    @onEnter="sendMessage"
                    :placeholder="$t('labels.typeYourMessage')"
                  ></chat-editable>
                  <v-btn
                    color="secondary"
                    class="ma-0 send-message-btn pa-0"
                    @click="sendMessage"
                    :disabled="chatMessageEditor === null || chatMessageEditor === ''"
                  >
                    <v-icon color="white">fa-paper-plane</v-icon>
                  </v-btn>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
</template>
<script>
  import moment from 'moment'
  import { groupBy, find } from 'lodash'
  import ChatEditable from '@/views/Components/Editable/ChatEditable'
  import { rgba as Gradients } from '@/data/gradients'
  import { groups, conversation, authUser } from '@/data/dummyData'

  export default {
    data () {
      return {
        chatMessageEditor: null,
        drawerinternal: true,
        title: this.$t('labels.chat'),
        gradientsList: Gradients,
        gradient: Gradients[9],
        chatGradient: Gradients[5],
        backgroundImg: '/static/doc-images/HexesisMaterial03.png',
        activeGroupId: 1,
        authUser,
        // Chat is always a group of members. For personal chat, it's restricted members (Only 2 members)
        // For personal chat, we just fetch other user's information to display in the list
        groups,
        // Get All conversation where auth user is member of the group
        // Not, conversation needs to be group by GroupID that's is.
        // For new, message push message on conversation object
        // It will automatically, manage the rest of the things.
        conversation,
        search: ''
      }
    },
    components: {
      ChatEditable
    },
    beforeDestroy () {
      this.$eventBus.$off('resetChatEditor')
    },
    methods: {
      switchGroup (group) {
        const ps = document.querySelector('#chatscrollstatesetter')
        ps.scrollTop = 0
        this.activeGroupId = group.id
        this.$nextTick(() => {
          ps.scrollTop = ps.scrollHeight
        })
      },
      changeChatBackground (gradient) {
        this.chatGradient = gradient
      },
      sendMessage () {
        const activeGroup = this.activeGroup
        const authUser = this.authUser
        this.conversation.push({
          group_id: activeGroup.id,
          user_id: authUser.id,
          user: authUser,
          message: this.chatMessageEditor,
          created_at: moment().unix()
        })
        this.chatMessageEditor = null
        this.$eventBus.$emit('resetChatEditor')
        this.$nextTick(() => {
          const container = document.querySelector('#chatscrollstatesetter')
          container.scrollTop = container.scrollHeight
        })
      }
    },
    computed: {
      conversationGroup () {
        return groupBy(this.conversation, 'group_id')
      },
      activeGroup () {
        return find(this.groups, { 'id': this.activeGroupId })
      },
      chat () {
        const group = this.activeGroupId
        return this.conversationGroup[group]
      },
      filteredGroup () {
        return this.groups.filter((member) => member.user.name.toLowerCase().includes(this.search.toLowerCase()))
      }
    }
  }
</script>
<style scoped>
  .toobar-extension {
    margin-left: 0 !important;
    min-width: 300px;
  }
</style>
