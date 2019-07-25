<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>
				<v-flex xs6>

					<div  
					class="white--text" 
					style="margin-top: 10%; margin-left: 10%;">
						<h1 class="display-1">{{ this.$route.meta.title }}</h1>
						<h2 class="display-3" style="font-weight:bold;">COMING SOON</h2>

						<p class="pl-1 headline">Meanwhile feel free to explore our LightFinder.</p>
					</div>

				</v-flex>


				<v-flex xs6 pt-5>
					
					<contact-us :subject="this.$route.meta.title+' Inquiry'"></contact-us>
			
				</v-flex>				
			</v-layout>
		</v-container>
	</div>
</template>



<script>
import ContactUs from '@/views/Components/App/Buyer/ContactUs'


export default {
	components: {
		ContactUs
	},

}
	
</script>



