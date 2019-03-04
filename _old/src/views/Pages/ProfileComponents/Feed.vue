<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-container fluid grid-list-xl>
        <v-layout row wrap>
          <v-flex xs12 sm8>
            <!-- What's in yout mind? -->
            <v-card color="grey lighten-3">
              <v-card-text>
                <v-textarea
                  solo
                  name="input-1"
                  class="no-details white py-0"
                  placeholder="What's new today?"
                ></v-textarea>
              </v-card-text>
              <v-card-actions class="profile-action-btn">
                <v-btn flat icon light>
                  <v-icon>photo</v-icon>
                </v-btn>
                <v-btn flat icon light>
                  <v-icon>person</v-icon>
                </v-btn>
                <v-btn flat icon light>
                  <v-icon>location_on</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary">Post</v-btn>
              </v-card-actions>
            </v-card>
            <!-- Posts Listing: Style 1-->
            <v-card class="mt-5" light>
              <!-- User info -->
              <v-list two-line class="profile-card-list">
                <template>
                  <v-list-tile avatar @click="() => {}">
                    <!-- User profile pic -->
                    <v-list-tile-avatar>
                      <img :src="users[1].avatar">
                    </v-list-tile-avatar>
                    <!-- User Post details -->
                    <v-list-tile-content>
                      <v-list-tile-title>{{users[1].name}}</v-list-tile-title>
                      <v-list-tile-sub-title>7 Days ago</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon ripple>
                        <v-icon color="grey lighten-1">more_vert</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
              </v-list>
              <!-- Post Text -->
              <v-card-text class="py-0">
                <div>Located two hours south of Sydney in the Southern Highlands of New South Wales, ...</div>
                <v-img :src="backgroundImages[1]" height="500px" class="mt-3"></v-img>
              </v-card-text>
              <!-- Post Action -->
              <v-card-actions class="profile-action-btn">
                <v-btn flat>
                  <v-icon left>thumb_up</v-icon> Like (13)
                </v-btn>
                <v-btn flat>
                  <v-icon left>share</v-icon> Share
                </v-btn>
              </v-card-actions>

              <!-- Comments -->
              <v-card-text class="py-0 grey lighten-3">
                <div class="body-2 nolabel--text py-3"><v-icon left color="nolabel">comment</v-icon> Comments</div>

                <!-- Commnets Layouts -->
                <v-layout align-center row spacer>
                  <template>
                    <v-flex xs12 class="py-0">
                      <!-- Comment -->
                      <v-avatar size="36px" slot="activator">
                        <img :src="users[2].avatar" alt="">
                      </v-avatar>
                      <span class="pl-2">
                        <strong>{{users[2].name}}</strong>
                        <span class="body-1 grey--text">June 10, 2015</span>
                      </span>
                      <div class="pl-5">
                        <p>Thank you for joining our community and for using Vuetify in your projects. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                      </div>
                      <div class="pl-5">
                        <v-btn-toggle class="cursor-pointer blue--text body-2 transparent" @click="() => {}">
                          Reply
                        </v-btn-toggle>
                        <v-btn flat icon color="grey" class="ma-0">
                          <v-icon>flag</v-icon>
                        </v-btn>
                      </div>
                    </v-flex>
                  </template>
                </v-layout>

                <!-- Add Comment -->
                <add-comment></add-comment>
              </v-card-text>
            </v-card>

            <!-- Posts Listing: Style 2-->
            <v-card class="mt-5" light>
              <!-- User info -->
              <v-list two-line class="profile-card-list">
                <template>
                  <v-list-tile avatar @click="() => {}">
                    <!-- User profile pic -->
                    <v-list-tile-avatar>
                      <img :src="users[3].avatar">
                    </v-list-tile-avatar>
                    <!-- User Post details -->
                    <v-list-tile-content>
                      <v-list-tile-title>{{users[3].name}}</v-list-tile-title>
                      <v-list-tile-sub-title>1 Day ago</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon ripple>
                        <v-icon color="grey lighten-1">more_vert</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
              </v-list>
              <!-- Post Text -->
              <v-card-text class="py-0">
                <div>Located two hours south of Sydney in the Southern Highlands of New South Wales, ...</div>
                <v-img :src="backgroundImages[2]" height="400px" class="mt-3"></v-img>
                <v-card-title class="px-0">
                  <div>
                    <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                    <div>Located two hours south of Sydney in the Southern Highlands of New South Wales, ...</div>
                  </div>
                </v-card-title>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

              </v-card-text>
              <!-- Post Action -->
              <v-card-actions class="profile-action-btn">
                <v-btn flat>
                  <v-icon left>thumb_up</v-icon> Like (13)
                </v-btn>
                <v-btn flat>
                  <v-icon left>share</v-icon> Share
                </v-btn>
              </v-card-actions>

              <!-- Comments -->
              <v-card-text class="py-0 grey lighten-3">
                <div class="body-2 nolabel--text py-3"><v-icon left color="nolabel">comment</v-icon> Comments</div>

                <!-- Commnets Layouts -->
                <v-layout align-center row spacer>
                  <template>
                    <v-flex xs12 class="py-0">
                      <!-- Comment -->
                      <v-avatar size="36px" slot="activator">
                        <img :src="users[4].avatar">
                      </v-avatar>
                      <span class="pl-2">
                        <strong>{{users[4].name}}</strong>
                        <span class="body-1 grey--text">June 10, 2015</span>
                      </span>
                      <div class="pl-5">
                        <p>Thank you for joining our community and for using Vuetify in your projects. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                      </div>
                      <div class="pl-5">
                        <v-btn-toggle class="cursor-pointer blue--text body-2 transparent" @click="() => {}">
                          Reply
                        </v-btn-toggle>
                        <v-btn flat icon color="grey" class="ma-0">
                          <v-icon>flag</v-icon>
                        </v-btn>
                      </div>
                    </v-flex>
                  </template>
                </v-layout>

                <!-- Add Comment -->
                <add-comment></add-comment>
              </v-card-text>
              <!-- <v-card-text class="py-0">
              </v-card-text> -->
            </v-card>

            <!-- Posts Listing: Style 3-->
            <v-card class="mt-5" light>
              <!-- User info -->
              <v-list two-line class="profile-card-list">
                <template>
                  <v-list-tile avatar @click="() => {}">
                    <!-- User profile pic -->
                    <v-list-tile-avatar>
                      <img :src="users[5].avatar">
                    </v-list-tile-avatar>
                    <!-- User Post details -->
                    <v-list-tile-content>
                      <v-list-tile-title>{{users[5].name}}</v-list-tile-title>
                      <v-list-tile-sub-title>1 Day ago</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon ripple>
                        <v-icon color="grey lighten-1">more_vert</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
              </v-list>
              <!-- Post Text -->
              <v-card-text class="py-0">
                <div>Located two hours south of Sydney in the Southern Highlands of New South Wales, ...</div>
                <v-layout row align-center>
                  <v-flex xs4 sm4 md2 class="text-xs-left">
                     <v-img
                        src="/static/doc-images/cards/halcyon.png"
                        height="125px"
                        contain
                      ></v-img>
                  </v-flex>
                  <v-flex xs8 sm8 md10>
                    <div>
                      <div class="headline">Halycon Days</div>
                      <div>Ellie Goulding</div>
                    </div>
                  </v-flex>
                </v-layout>

              </v-card-text>
              <!-- Post Action -->
              <v-card-actions class="profile-action-btn">
                <v-btn flat>
                  <v-icon left>thumb_up</v-icon> Like (13)
                </v-btn>
                <v-btn flat>
                  <v-icon left>share</v-icon> Share
                </v-btn>
              </v-card-actions>

              <!-- Comments -->
              <v-card-text class="py-0 grey lighten-3">
                <div class="body-2 nolabel--text py-3"><v-icon left color="nolabel">comment</v-icon> Comments</div>

                <!-- Commnets Layouts -->
                <v-layout align-center row spacer>
                  <template>
                    <v-flex xs12 class="py-0">
                      <!-- Comment -->
                      <v-avatar size="36px" slot="activator">
                        <img :src="users[0].avatar" alt="">
                      </v-avatar>
                      <span class="pl-2">
                        <strong>{{users[0].name}}</strong>
                        <span class="body-1 grey--text">June 10, 2015</span>
                      </span>
                      <div class="pl-5">
                        <p>Thank you for joining our community and for using Vuetify in your projects. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                      </div>
                      <div class="pl-5">
                        <v-btn-toggle class="cursor-pointer blue--text body-2 transparent" @click="() => {}">
                          Reply
                        </v-btn-toggle>
                        <v-btn flat icon color="grey" class="ma-0">
                          <v-icon>flag</v-icon>
                        </v-btn>
                      </div>
                    </v-flex>
                  </template>
                </v-layout>

                <!-- Add Comment -->
                <add-comment></add-comment>
              </v-card-text>
              <!-- <v-card-text class="py-0">
              </v-card-text> -->
            </v-card>

            <!-- Posts Listing: Style 4-->
            <v-card class="mt-5" light>
              <!-- User info -->
              <v-list two-line class="profile-card-list">
                <template>
                  <v-list-tile avatar @click="() => {}">
                    <!-- User profile pic -->
                    <v-list-tile-avatar>
                      <img :src="users[1].avatar" alt="">
                    </v-list-tile-avatar>
                    <!-- User Post details -->
                    <v-list-tile-content>
                      <v-list-tile-title>{{users[1].name}}</v-list-tile-title>
                      <v-list-tile-sub-title>1 Day ago</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon ripple>
                        <v-icon color="grey lighten-1">more_vert</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
              </v-list>
              <!-- Post Text -->
              <v-card-text class="py-0">
                <div>Located two hours south of Sydney in the Southern Highlands of New South Wales. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. </div>
              </v-card-text>
              <!-- Post Action -->
              <v-card-actions class="profile-action-btn">
                <v-btn flat>
                  <v-icon left>thumb_up</v-icon> Like (13)
                </v-btn>
                <v-btn flat>
                  <v-icon left>share</v-icon> Share
                </v-btn>
              </v-card-actions>

              <!-- Comments -->
              <v-card-text class="py-0 grey lighten-3">
                <div class="body-2 nolabel--text py-3"><v-icon left color="nolabel">comment</v-icon> Comments</div>

                <!-- Commnets Layouts -->
                <v-layout align-center row spacer>
                  <template>
                    <v-flex xs12 class="py-0">
                      <!-- Comment -->
                      <v-avatar size="36px" slot="activator">
                        <img :src="users[2].avatar" alt="">
                      </v-avatar>
                      <span class="pl-2">
                        <strong>{{users[2].name}}</strong>
                        <span class="body-1 grey--text">June 10, 2015</span>
                      </span>
                      <div class="pl-5">
                        <p>Thank you for joining our community and for using Vuetify in your projects. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.</p>
                      </div>
                      <div class="pl-5">
                        <v-btn-toggle class="cursor-pointer blue--text body-2 transparent" @click="() => {}">
                          Reply
                        </v-btn-toggle>
                        <v-btn flat icon color="grey" class="ma-0">
                          <v-icon>flag</v-icon>
                        </v-btn>
                      </div>
                    </v-flex>
                  </template>
                </v-layout>

                <!-- Add Comment -->
                <add-comment></add-comment>
              </v-card-text>
              <!-- <v-card-text class="py-0">
              </v-card-text> -->
            </v-card>
          </v-flex>
          <v-flex xs12 sm4>
            <last-activities></last-activities>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
  import AddComment from './section/AddComment'
  import LastActivities from './section/LastActivities'
  import {authUser, users} from '@/data/dummyData'
  import backgroundImages from '@/data/json/backgroundimgs'
  export default {
    components: {
      AddComment,
      LastActivities
    },
    data () {
      return {
        fab: false,
        authUser,
        users,
        backgroundImages
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .input-group__details
    display: none
  .profile-action-btn
    margin: 0 8px
</style>
