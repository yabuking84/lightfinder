<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Friends</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn flat>
            See All
          </v-btn>
        </v-toolbar>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex
              xs4
              v-for="n in 9"
              :key="n"
            >
              <v-card flat tile>
                <v-img
                  :src="`https://randomuser.me/api/portraits/women/${n + 5}.jpg`"
                  height="100px"
                >
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        size: 'sm',
        items: [
          { text: 'Extra small (1px)', value: 'xs' },
          { text: 'Small (4px)', value: 'sm' },
          { text: 'Medium (8px)', value: 'md' },
          { text: 'Large (16px)', value: 'lg' },
          { text: 'Extra large (24px)', value: 'xl' }
        ]
      }
    }
  }
</script>
