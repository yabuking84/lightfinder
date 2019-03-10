<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-container fluid grid-list-xl>
        <v-layout row wrap>
          <v-flex xs12 class="px-1">
            <v-subheader>May</v-subheader>
            <v-container fluid grid-list-md class="grey lighten-4">
              <v-layout row wrap>
                <v-flex
                  v-bind="{ [`xs${card.flex}`]: true }"
                  v-for="(card, index) in cards"
                  :key="`profile-media-may-${index}`"
                >
                  <v-card>
                    <v-img
                      :src="card.src"
                      height="200px"
                    >
                      <v-container fill-height fluid>
                        <v-layout fill-height>
                          <v-flex xs12 align-end flexbox>
                            <span class="headline white--text" v-text="card.title"></span>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
            <v-subheader>June</v-subheader>
            <v-container fluid grid-list-md class="grey lighten-4">
              <v-layout row wrap>
                <v-flex
                  v-bind="{ [`xs${card.flex}`]: true }"
                  v-for="(card, index) in cards"
                  :key="`profile-media-june-${index}`"
                >
                  <v-card>
                    <v-img
                      :src="card.src"
                      height="200px"
                    >
                      <v-container fill-height fluid>
                        <v-layout fill-height>
                          <v-flex xs12 align-end flexbox>
                            <span class="headline white--text" v-text="card.title"></span>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    data () {
      return {
        cards: [
          { title: 'Pre-fab homes', src: '/static/doc-images/cards/house.jpg', flex: 3 },
          { title: 'Favorite road trips', src: '/static/doc-images/cards/road.jpg', flex: 3 },
          { title: 'Best airlines', src: '/static/doc-images/cards/plane.jpg', flex: 3 },
          { title: 'Pre-fab homes', src: '/static/doc-images/cards/house.jpg', flex: 3 }
        ]
      }
    }
  }
</script>
