<template>
  <v-layout row>
    <v-flex xs12>
      <v-card class="grid pb-3">
        <v-toolbar color="primary" flat dark>
          <v-toolbar-title>Albums</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>
        <v-subheader>May</v-subheader>
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex xs4 v-for="i in 6" :key="i">
              <img class="image" v-bind:src="`https://unsplash.it/150/150?image=${Math.floor(Math.random() * 100) + 1}`" alt="lorem" width="100%" height="100%">
            </v-flex>
          </v-layout>
        </v-container>
        <v-subheader>June</v-subheader>
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex xs4 v-for="i in 6" :key="i">
              <img class="image" v-bind:src="`https://unsplash.it/150/150?image=${Math.floor(Math.random() * 100) + 1}`" alt="lorem" width="100%" height="100%">
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>
