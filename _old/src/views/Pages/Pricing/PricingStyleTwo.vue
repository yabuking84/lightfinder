<template>
  <div>
    <v-img
      :src="backgroundImg"
      height="300"
      class="overflow-initial"
    >
      <toolbar-simple></toolbar-simple>
      <v-layout row wrap text-xs-center class="box-white-500-glow pricing-section">
        <v-flex xs12 class="mt-5">
          <div class="display-2" v-text="banner.title"></div>
        </v-flex>
        <v-flex xs12>
          <v-container fluid light>
            <v-layout row wrap justify-center class="text-xs-center" mt-5>
              <v-flex xs12 sm12 md4 lg3
                class="mx-3 mb-5 price-card"
                v-for="(plan, i) in plans"
                :key="i"
              >
                <v-card class="py-4 border-radius6"
                  :class="[plan.name === choosed.name ? 'elevation-20' : '']"
                  :color="plan.name === choosed.name ? 'white' : ''"
                >
                  <v-card-text class="no-mrpd">
                    <v-avatar
                      size="150"
                      :class="[plan.name === choosed.name ? 'box-pink-300-glow' : 'box-deep-purple-500-glow']"
                    >
                      <span class="headline white--text">{{plan.name}}</span>
                    </v-avatar>
                    <p class="subheading mt-1">{{ plan.audience }}</p>
                    <div class="cost box-pink-300-glow white--text" v-html="plan.cost"></div>
                    <p v-for="(feature, i) in plan.features" :key="i" v-html="feature" class="body-2"></p>
                  </v-card-text>
                  <v-btn color="box-deep-purple-a700-glow" @click="setPlan(plan)" dark>{{ plan.action.text }}</v-btn>
                  <p v-html="plan.trial"></p>
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-container grid-list-lg>
                  <v-layout row wrap dark>
                    <v-flex xs12 text-xs-center>
                      <h4 class="display-1">FAQ</h4>
                      <p class="title">It's okay. We all have questions that need answers.</p>
                    </v-flex>
                    <v-flex xs12 sm6
                      v-for="(faq, i) in faqs"
                      :key="i"

                    >
                      <v-card class="pa-4 box-grey-50-glow">
                        <v-card-title primary-title>
                          <div class="title">
                            <v-icon left>{{ faq.icon }}</v-icon> {{ faq.title }}
                          </div>
                          <div v-html="faq.detail"></div>
                        </v-card-title>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-img>
  </div>
</template>

<script>
  import { rgba as Gradients } from '@/data/gradients'
  import ToolbarSimple from '@/views/Components/App/FullPageSimple/Toolbar'
  export default {
    data () {
      return {
        gradient: Gradients[9],
        backgroundImg: '/static/doc-images/HexesisMaterial01.png',
        banner: {
          title: `Let's Get You Signed Up.`,
          description: 'Joining takes less than a minute, and, if your peers are correct, is a pretty dang good decision.'
        },
        plans: [
          {
            name: 'Basic',
            audience: 'For single usage',
            cost: `<span class="display-1"><sup>$</sup> 4.9</span> monthly per user`,
            features: [
              '1 vCPU',
              '1TB Transfer',
              '10GB Disk space',
              '10 Projects',
              '10 Boards',
              '24/7 Support'
            ],
            action: {
              text: 'Get started'
            },
            trial: `<div class="cyan--text">7 day free trial to start</div>`
          },
          {
            name: 'Standard',
            audience: 'For 10 users',
            cost: `<span class="display-1"><sup>$</sup> 12.5</span> monthly per user`,
            features: [
              '2 vCPU',
              '2TB Transfer',
              '30GB SSD Disk',
              '30 Projects',
              '60 Boards',
              '24/7 Support'
            ],
            action: {
              text: 'Get started'
            },
            trial: `<div class="cyan--text">$5 credit for new A/C</div>`
          },
          {
            name: 'Premium',
            audience: 'For unlimited users',
            cost: `<span class="display-1"><sup>$</sup> 29.5</span> monthly per user`,
            features: [
              '4 vCPU',
              '3TB Transfer',
              '128GB Fusion Disk',
              'Unlimited Projects',
              'Unlimited Boards',
              '24/7 Support'
            ],
            action: {
              text: 'Get started'
            },
            trial: `<div class="cyan--text">Backup + Cloud storage</div>`
          }
        ],
        faqs: [
          {
            title: 'Can I cancel at any time?',
            icon: 'message',
            detail: `Vuse subscriptions renew, just like Netflix or Hulu. But, of course you can cancel at any point. It would be a pretty shabby business, if that wasn't an option. :) Seriously — it's not like the gym. Visit your settings page, click "Cancel," and done. Tears will be shed on this end, but that's not your concern.`
          },
          {
            title: 'If I sign up, do I gain access to everything?',
            icon: 'message',
            detail: `Vuse subscriptions renew, just like Netflix or Hulu. But, of course you can cancel at any point. It would be a pretty shabby business, if that wasn't an option. :) Seriously — it's not like the gym. Visit your settings page, click "Cancel," and done. Tears will be shed on this end, but that's not your concern.`
          },
          {
            title: 'Do you offer student discounts?',
            icon: 'message',
            detail: `Vuse subscriptions renew, just like Netflix or Hulu. But, of course you can cancel at any point. It would be a pretty shabby business, if that wasn't an option. :) Seriously — it's not like the gym. Visit your settings page, click "Cancel," and done. Tears will be shed on this end, but that's not your concern.`
          },
          {
            title: 'Seriously, was Total Recall a dream or not?',
            icon: 'message',
            detail: `Vuse subscriptions renew, just like Netflix or Hulu. But, of course you can cancel at any point. It would be a pretty shabby business, if that wasn't an option. :) Seriously — it's not like the gym. Visit your settings page, click "Cancel," and done. Tears will be shed on this end, but that's not your concern.`
          }
        ],
        choosed: {
          name: 'Standard',
          audience: 'For 10 users',
          cost: `<span class="display-1"><sup>$</sup> 12.5</span> monthly per user`,
          features: [
            '2 vCPU',
            '2TB Transfer',
            '30GB SSD Disk',
            '30 Projects',
            '60 Boards',
            '24/7 Support'
          ],
          action: {
            text: 'Get started'
          },
          trial: `<div class="pink--text">$5 credit for new A/C</div>`
        }
      }
    },
    components: {
      ToolbarSimple
    },
    methods: {
      setPlan (plan) {
        this.choosed = plan
      }
    }
  }
</script>

<style scoped lang="stylus">
  .pricing-section
    margin 150px 48px 48px 48px
    border-radius: 6px
  .price-card
    max-width 320px
  .cost
    padding: 10px 0
    margin-bottom: 20px
</style>
