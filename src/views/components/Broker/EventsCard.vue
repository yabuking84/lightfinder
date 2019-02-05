<template>
  <div>
    <v-container fluid grid-list-xl>
    	 <v-layout justify-start row>
    		<v-flex >
    			<h1 class="title">Hottest Offers</h1>
						<v-layout align-center justify-center fill-height row>
							<v-card v-for="(item, i) in items" :key="i" width="540px">
							        <v-img
							        	:src="item.src"
							          height="500px"
							        >
							        </v-img>

							        <v-card-title primary-title>
							          <div>
							            <div class="headline">Top western road trips</div>
							            <span class="grey--text">1,000 miles of wonder</span>
							          </div>
							        </v-card-title>

							        <v-card-actions>
							          <v-btn flat>Share</v-btn>
							          <v-btn flat color="purple">Explore</v-btn>
							          <v-spacer></v-spacer>
							          <v-btn icon @click="show = !show">
							            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
							          </v-btn>
							        </v-card-actions>

							        <v-slide-y-transition>
							          <v-card-text v-show="show">
							            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
							          </v-card-text>
							        </v-slide-y-transition>
					      </v-card>
				 		 </v-layout>
			</v-flex>
		</v-layout>
    </v-container>
  </div>	

</template>


<script>

export default {	

	data: () => ({

		items: [
			{ src: '/static/boats/boats-uploaded/boat1.jpg' },
			{ src: '/static/boats/boats-uploaded/boat2.jpg' },
		]

	})
}
	
</script>


<style scoped lang="scss">

	div#test {
		height:500px;
	}

	h1.title {
		margin-bottom: 20px;
	}

	img {
		width: 100%;
	}

</style>
