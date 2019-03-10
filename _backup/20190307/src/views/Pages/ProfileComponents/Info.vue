<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-container fluid grid-list-xl>
        <v-layout row wrap>
          <v-flex xs12 sm6 md6 lg7>
            <v-card v-for="(item, index) in items" :key="index" class="mb-5">
              <v-toolbar color="primary" dark>
                <v-toolbar-title v-text="item.toolbar"></v-toolbar-title>
              </v-toolbar>
              <v-layout row wrap class="px-3">
                <v-flex xs12 v-for="(listItem, i) in item.list" :key="i">
                  <strong v-text="listItem.title"></strong>
                  <div v-html="listItem.subtitle"></div>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6 md6 lg5>
            <friends-grid></friends-grid>
            <user-gallery></user-gallery>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
  import FriendsGrid from './section/FriendsGrid'
  import UserGallery from './section/Gallery'

  export default {
    components: {
      FriendsGrid,
      UserGallery
    },
    data () {
      return {
        items: [
          {
            toolbar: 'Information',
            list: [
              {
                title: 'Full Name',
                subtitle: 'Mia Toretto'
              },
              {
                title: 'Gender',
                subtitle: 'Female'
              },
              {
                title: 'Birthdate',
                subtitle: 'April 14, 1992'
              },
              {
                title: 'Location',
                subtitle: `
                  CA Los Angeles<br>
                  US california
                `
              },
              {
                title: 'About Me',
                subtitle: `I'm web developer working in fullstack application. I choose this firm b'coz I love it. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
              }
            ]
          },
          {
            toolbar: 'Work',
            list: [
              {
                title: 'Profesion Name',
                subtitle: 'Developer'
              },
              {
                title: 'Experience',
                subtitle: '5 years'
              },
              {
                title: 'Skill',
                subtitle: 'C, C++, HTML/CSS, PHP, Laravel, VueJS, AngularJS, JavaScript'
              },
              {
                title: 'Jobs',
                subtitle: `
                  <span class="body-2">Developer</span> 2012 @TCS </br>
                  <span class="body-2">System Architect</span> 2014 @Google
                `
              },
              {
                title: 'Site',
                subtitle: `See my work on <a href="http://hexesis.com">hexesis.com</a>`
              }
            ]
          },
          {
            toolbar: 'Contact',
            list: [
              {
                title: 'Address',
                subtitle: '3916 Williams Mine Road, Summit, New Jersey, ZipCode 07901'
              },
              {
                title: 'Phone',
                subtitle: `
                  <span class="body-2">Office</span> 908-277-5445 </br>
                  <span class="body-2">Fax</span> 908-746-6136
                `
              },
              {
                title: 'Website',
                subtitle: 'hexesis.com'
              },
              {
                title: 'Email',
                subtitle: `
                  hello@hexesis.com </br>
                  envato@hexesis.com
                `
              }
            ]
          }
        ]
      }
    }
  }
</script>
