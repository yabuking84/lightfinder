<template>
  <v-layout row wrap justify-end class="grey lighten-3">
    <v-flex xs12>
      <!-- User info -->
      <!-- Comments -->
      <v-card-text class="py-0 grey lighten-3">
        <div class="body-2 nolabel--text py-3">
          <v-icon left color="nolabel">comment</v-icon> Message
        </div>

        <!-- Commnets Layouts -->
        <v-layout align-center row spacer>
          <template>
            <v-flex xs12 class="py-0">
              <!-- Comment -->
              <v-avatar size="36px" slot="activator">
                <img src="http://i.pravatar.cc/64" alt="">
              </v-avatar>
              <span class="pl-2">
                <strong>Larry Parba</strong>
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
            </v-flex>
          </template>
        </v-layout>

        <v-layout align-center row spacer>
          <template>
            <v-flex xs12 class="py-0">
              <!-- Comment -->
              <v-avatar size="36px" slot="activator">
                <img src="http://i.pravatar.cc/64" alt="">
              </v-avatar>
              <span class="pl-2">
                <strong>Larry Parba</strong>
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
            </v-flex>
          </template>
        </v-layout>

        <!-- Add Comment -->
        <v-layout row wrap class="add-comment">
          <v-flex xs12 class="pos-relative pl-5">
            <v-avatar size="36px" class="pos-absolute">
              <img src="http://i.pravatar.cc/64">
            </v-avatar>
            <v-textarea auto-grow :row-height="16" flat outline auto-grow v-model="comment" class="clean-textarea no-details white py-0 pl-5" placeholder="Your Message"></v-textarea>
            <v-layout row wrap>
              <v-spacer></v-spacer>
              <v-btn color="blue-grey" dark class="ml-0" @click.stop="submit"> <i class="fas fa-paper-plane"></i>&nbsp&nbsp Add Message</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- Add Comment -->


      </v-card-text>
    </v-flex>
  </v-layout>
</template>
<script>
import { authUser } from '@/data/dummyData'
export default {
  data() {
    return {
      authUser,
      comment: null
    }
  },
  methods: {
    submit() {

    }
  }
}

</script>
