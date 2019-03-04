<template>
  <v-layout row wrap mt-4 mx-0 >
    <v-flex xs12 class="text-xs-center">
      <v-card flat class="transparent">
        <v-card-text>
          <v-rating v-model="ratings" background-color="pink lighten-3"
            color="pink accent-4"
            dense
            half-increments
            hover
            size="18">
          </v-rating>
          <v-btn @click="about.followEvent"><v-icon left dark>person_add</v-icon>Follow</v-btn>
          <v-btn @click="about.messageEvent"><v-icon left dark>message</v-icon>Message</v-btn>
        </v-card-text>
        <v-card-actions>
          <v-layout>
            <v-flex xs6>
              <p class="primary--text ma-0">{{about.followers}}</p>
                Followers
            </v-flex>
            <v-flex xs6>
              <p class="primary--text ma-0">{{about.followers}}</p>
                Followers
            </v-flex>
          </v-layout>
        </v-card-actions>
        <v-card-text class="text-xs-left">
          <h3 class="headline mb-0 primary--text">About</h3>
          <p v-html="about.description"></p>
          <h3 class="headline mb-0 primary--text">Interest</h3>
          <p>
            <template v-for="(item, i) in about.interests" >
              <v-chip color="primary" text-color="white" :key="`interest-${i}`">{{item}}</v-chip>
            </template>
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: {
    ratings: {
      type: Number,
      default: 0
    },
    about: Object
  }
}
</script>

