<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-toolbar color="secondary" dark flat>
          <v-toolbar-title>Last Activities</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn flat>
            See All
          </v-btn>
        </v-toolbar>
        <v-list three-line>
          <template v-for="(item, i) in items">
            <v-subheader v-if="item.header" v-text="item.header" :key="i"></v-subheader>
            <v-divider v-else-if="item.divider" v-bind:inset="item.inset" :key="i"></v-divider>
            <v-list-tile avatar v-else v-bind:key="i" @click="() => {}">
              <v-list-tile-avatar>
                <img v-bind:src="item.avatar"/>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import {users} from '@/data/dummyData'
  export default {
    data () {
      return {
        items: [
          { header: 'Today' },
          {
            avatar: users[1].avatar,
            title: 'Brunch this weekend?',
            subtitle: `<span class='blue--text body-2 text--darken-2'>${users[1].name}</span> — I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`
          },
          { divider: true, inset: true },
          {
            avatar: users[2].avatar,
            title: 'Summer BBQ <span class=`grey--text text--lighten-1`>4</span>',
            subtitle: `<span class='blue--text body-2 text--darken-2'>to ${users[1].name}, ${users[3].name}</span> — Wish I could come, but I'm out of town this weekend.`
          },
          { divider: true, inset: true },
          {
            avatar: users[3].avatar,
            title: 'Oui oui',
            subtitle: `<span class='blue--text body-2 text--darken-2'>${users[3].name}</span> — Do you have Paris recommendations? Have you ever been?`
          },
          { divider: true, inset: true },
          { avatar: users[4].avatar,
            title: 'Birthday gift',
            subtitle: `<span class='blue--text body-2 text--darken-2'>${users[4].name}</span> — Have any ideas about what we should get Heidi for her birthday?`
          },
          { divider: true, inset: true },
          { avatar: users[5].avatar,
            title: 'Recipe to try',
            subtitle: `<span class='blue--text body-2 text--darken-2'>${users[5].name}</span> — We should eat this: Grate, Squash, Corn, and tomatillo Tacos.`
          },
          { header: 'Yesterday' },
          {
            avatar: users[1].avatar,
            title: 'Brunch this weekend?',
            subtitle: `<span class='blue--text body-2 text--darken-2'>${users[1].name}</span> — I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`
          },
          { divider: true, inset: true },
          {
            avatar: users[2].avatar,
            title: 'Summer BBQ <span class=`grey--text text--lighten-1`>4</span>',
            subtitle: `<span class='blue--text body-2 text--darken-2'>to ${users[1].name}, ${users[3].name}</span> — Wish I could come, but I'm out of town this weekend.`
          },
          { divider: true, inset: true },
          {
            avatar: users[3].avatar,
            title: 'Oui oui',
            subtitle: `<span class='blue--text body-2 text--darken-2'>${users[3].name}</span> — Do you have Paris recommendations? Have you ever been?`
          },
          { divider: true, inset: true },
          { avatar: users[4].avatar,
            title: 'Birthday gift',
            subtitle: `<span class='blue--text body-2 text--darken-2'>${users[4].name}</span> — Have any ideas about what we should get Heidi for her birthday?`
          },
          { divider: true, inset: true },
          { avatar: users[5].avatar,
            title: 'Recipe to try',
            subtitle: `<span class='blue--text body-2 text--darken-2'>${users[5].name}</span> — We should eat this: Grate, Squash, Corn, and tomatillo Tacos.`
          }
        ]
      }
    }
  }
</script>
