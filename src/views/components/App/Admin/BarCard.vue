<template>
  <div>
    <v-card flat>
      <v-container fill-height fluid grid-list-lg pa-0>
        <v-layout row wrap>
          <template v-for="(dataItem, index) in revenueTrend.data">
            <v-flex xs12 sm6 md2 :key="index">
              <v-card flat class="transparent text-xs-center box-glow pa-2" dark>
                
                <!-- <v-card-title class="pa-0">
                  <component :is="dataItem.type" :data="dataItem.chartData" :gradient="dataItem.trendGradient" auto-draw smooth>
                  </component>
                </v-card-title> -->

                <v-card-text class="pa-0 mt-2">
                  <h3 class="headline">{{ dataItem.statistic }}</h3>
                  <p class="subheading font-light-weight">{{ dataItem.title }}</p>
                </v-card-text>
              </v-card>
            </v-flex>
          </template>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {

  data: () => ({

    revenueTrend: {

      // jumbotron: 'to right top, #241d3b, #473974',
      data: [{
          type: 'bars',
          title: 'Total Buyer',
          statistic: '8610',
          chartData: [4, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 10],
          trendGradient: ['#2193b0', '#6dd5ed']
        },
        {
          type: 'bars',
          title: 'Total Supplier',
          statistic: ' 5800',
          chartData: [4, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 10],
          trendGradient: ['#FF8008', '#FFC837']
        },
        {
          type: 'bars',
          title: 'Total Inquiry',
          statistic: '1790',
          chartData: [8, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 10],
          trendGradient: ['#16A085', '#F4D03F']
          // trendGradient: ['#EDE574', '#E1F5C4']
        },
        {
          type: 'bars',
          title: 'Waiting to Verifying',
          statistic: '32',
          chartData: [6, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 10],
          trendGradient: ['#ec008c', '#1ca535']
        },
        {
          type: 'bars',
          title: 'Orders',
          statistic: '12',
          chartData: [6, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 10],
          trendGradient: ['#3175ce', '#fc6767']
        },
        {
          type: 'bars',
          title: 'Rejected',
          statistic: '1',
          chartData: [6, 2, 5, 9, 5, 10, 4, 5, 2, 4, 2, 8, 2, 9, 10],
          trendGradient: ['#e54124', '#1cce58']
        }
      ]
    },

  }),
}

</script>
