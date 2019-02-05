<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs4 order-md2 order-xs1 v-for="(itemss, i) in items" :key="i" >
          <v-card class="" >
                <v-img :src="itemss.src" height="300px" >
                  <v-container fill-height fluid pa-2 >
                    <v-layout fill-height>
                      <v-flex xs12 >
                        <span class="headline white--text" v-text="itemss.title"></span>
                        <div class="body-2 white--text ">
                         <span v-text="itemss.rate"> </span> AED Per Hour | 
                         <span v-text="itemss.capacity"></span> GUEST
                       </div>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
          </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
  
import BoatsCard from  '@/views/Components/Broker/BoatsCard/'
import axios from 'axios'

export default {
  data: () => ({

    api_url: {
      getBrokerBoatsUrl: 'http://192.168.1.205/liliwatersapi/public/api/v1/',
      getBrokerEventsUrl: ''
    },

    axios: {
      config: {
        headers: {
          'Authorization': "Bearer" + localStorage.getItem('access_token') || null
        }
      }
    },


    title: 'Boats',
    hover: false,

    items: [
      { 
        src: '/static/boats/boats-uploaded/boat1.jpg',
        title: 'Test Title 1',
        rate: Math.floor(Math.random() * 219),     
        capacity: Math.floor(Math.random() * 20) 
       },
      { 
        src: '/static/boats/boats-uploaded/boat2.jpg',
        title: 'Test Title 2',
       rate: Math.floor(Math.random() * 20),
        capacity: Math.floor(Math.random() * 20) 
       },
      { 
        src: '/static/boats/boats-uploaded/boat3.jpg',
        title: 'Test Title 2',
      rate: Math.floor(Math.random() * 20),
        capacity: Math.floor(Math.random() * 20) 
       },
       { 
        src: '/static/boats/boats-uploaded/boat1.jpg',
        title: 'Test Title 2',
       rate: Math.floor(Math.random() * 20),
        capacity: Math.floor(Math.random() * 20) 
       },
          { 
        src: '/static/boats/boats-uploaded/boat2.jpg',
        title: 'Test Title 2',
          rate: Math.floor(Math.random() * 20),
        capacity: Math.floor(Math.random() * 20) 
       },
          { 
        src: '/static/boats/boats-uploaded/boat3.jpg',
        title: 'Test Title 2',
       rate: Math.floor(Math.random() * 20),
        capacity: Math.floor(Math.random() * 20) 
       },
       { 
        src: '/static/boats/boats-uploaded/boat1.jpg',
        title: 'Test Title 2',
         rate: Math.floor(Math.random() * 20),
        capacity: Math.floor(Math.random() * 20) 
       },
          { 
        src: '/static/boats/boats-uploaded/boat2.jpg',
        title: 'Test Title 2',
         rate: Math.floor(Math.random() * 20),
        capacity: Math.floor(Math.random() * 20) 
       },
          { 
        src: '/static/boats/boats-uploaded/boat3.jpg',
        title: 'Test Title 2',
          rate: Math.floor(Math.random() * 20),
        capacity: Math.floor(Math.random() * 20) 
       },

    ]
  }),

  // COMPONENTS
  components: {
    BoatsCard
  },

  // COMPUTED
  computed: {

    broker: {
      set(data){
        this.$store.commit('auth/CHANGE_TEST_M',data);
      },
      get(){        
            return this.$store.state.auth.auth_user.name;
      },      
    },
  },

  // METHODS
  methods: {

    mouseover: function() {
      this.hover = !this.hover
      console.log('hover me');
    },



  },

  actions:  {

    getBrokerBoats_a(context, data) {
      return new Promise((resolve, reject) => {
          var url = state.api_url.getBrokerBoatsUrl;

          axios({

            method: 'get',
            'url':url

          })
          .then(response => {
              console.log(response)
          })
          .catch(error => {
              reject(error);
          });


      });
    },

    addMaskDic() {

    },

  }, // end of actions

}
  
</script>

<style scoped lang="">

  div#test {
    height:500px;
  }

  h1.title {
       margin-bottom: 20px;
      font-weight: bold;
  }

  .headline {
    font-size: 24px !important;
    font-weight: 400;
    line-height: 20px !important;
    letter-spacing: normal !important;
    font-family: 'Roboto', sans-serif !important;
  }

</style>
