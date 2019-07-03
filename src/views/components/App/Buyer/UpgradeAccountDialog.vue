<template>
  <div class="text-xs-center">
    <v-dialog
	@input="closeDialog()" 
	:value="openDialog"
	@keydown.escape="closeDialog()"
    width="90%">

      <v-card>

      	<v-card-title class="black white--text headline pa-3">
      	  	<v-layout row wrap justify-space-between align-center>
      	  	  
	      	  	<span class="ml-3">Upgrade Account</span>

				<v-btn dark flat @click="closeDialog()">
					<v-icon>close</v-icon>
				</v-btn>      	  	
      	  	</v-layout>
      	</v-card-title>

        <v-card-text style="text-align: center;">
      		<v-layout row wrap justify-center>
      			<v-flex px-5 py-4>
      				<div style="text-align: left;">      					
						<h3 class="headline mb-3 font-weight-bold">BAL Package: LightFinder</h3>
		      			<p style="text-align: justify;">
							Our packages are designed to make life much, much easier for lighting companies, businesses and individuals who source LED lights
							for their personal projects. Simply register online, then choose a package that suits your needs. You can either pay monthly or for a
							discount, you can make a single annual payment.       				
		      			</p>
      				</div>
      			</v-flex>
      		</v-layout>
      		<v-layout row wrap justify-center>

	      		<!-- mini -->
	      		<!-- ///////////////////////////////////// -->
	      		<v-card class="packages">
	      			<v-card-title 
	      			class="brown darken-4 white--text title"
	      			primary-title 
	      			style="text-align: left;">
	      				<h3 style="width: 100%">MINI</h3>
	      				Sourcing Reinvented
	      			</v-card-title>
	      			<v-card-text>	      				
	      				<ul class="mt-3" style="text-align: left;">
	      					<li><v-icon>fas fa-check</v-icon> Inquire & source 3 items</li>
	      					<li><v-icon>fas fa-check</v-icon> Minimum order quantity: 20</li>
	      					<li><v-icon>fas fa-check</v-icon> 100% payment protection</li>
	      					<li><v-icon>fas fa-check</v-icon> Best price guarantee</li>
	      					<li><v-icon>fas fa-check</v-icon> Sample request</li>
	      					<li><v-icon>fas fa-times</v-icon> Label & design support</li>
	      					<li><v-icon>fas fa-times</v-icon> Designated lighting designer</li>
	      					<li><v-icon>fas fa-times</v-icon> Markup feature</li>
	      				</ul>
	      				<v-layout mt-4 row wrap justify-space-around>

		      				<v-flex xs6>
		      					<span class="prices brown--text">$5499</span> /Yearly
			      				<v-btn 
			      				@click="paySubscription('yearly.mini')"
			      				:loading="loadingBtn"
			      				class="mt-2"
			      				color="success">
			      					Pay Yearly
			      				</v-btn>
		      				</v-flex>

		      				<v-flex xs6>		      				  
		      					<span class="prices brown--text">$499</span> /Monthly
			      				<v-btn 			      				
			      				@click="paySubscription('monthly.mini')"
			      				:loading="loadingBtn"
			      				class="mt-2"
			      				color="warning">
			      					Pay Monthly
			      				</v-btn>		      					
		      				</v-flex>

	      				</v-layout>
	      				<div class="side-note mt-3">
	      					*20% BAL fee on offer acceptance only
	      				</div>


	      			</v-card-text>	
	      		</v-card>
	      		<!-- ///////////////////////////////////// -->
	      		<!-- mini -->

	      		<!-- STANDARD -->
	      		<!-- ///////////////////////////////////// -->
	      		<v-card class="packages">
	      			<v-card-title 
	      			class="indigo darken-4 white--text title"
	      			primary-title 
	      			style="text-align: left;">
	      				<h3 style="width: 100%">STANDARD</h3>
	      				Sourcing Reinvented
	      			</v-card-title>
	      			<v-card-text>	      				
	      				<ul class="mt-3" style="text-align: left;">
	      					<li><v-icon>fas fa-check</v-icon> Inquire & source 6 items</li>
	      					<li><v-icon>fas fa-check</v-icon> Minimum order quantity: 10</li>
	      					<li><v-icon>fas fa-check</v-icon> 100% payment protection</li>
	      					<li><v-icon>fas fa-check</v-icon> Best price guarantee</li>
	      					<li><v-icon>fas fa-check</v-icon> Sample request</li>
	      					<li><v-icon>fas fa-times</v-icon> Label & design support</li>
	      					<li><v-icon>fas fa-times</v-icon> Designated lighting designer</li>
	      					<li><v-icon>fas fa-times</v-icon> Markup feature</li>
	      				</ul>
	      				<v-layout mt-4 row wrap justify-space-around>
		      				<v-flex xs6>
		      					<span class="prices indigo--text">$7699</span> /Yearly
			      				<v-btn 
			      				@click="paySubscription('yearly.standard')"
			      				:loading="loadingBtn"
			      				class="mt-2"
			      				color="success">
			      					Pay Yearly
			      				</v-btn>
		      				</v-flex>

		      				<v-flex xs6>		      				  
		      					<span class="prices indigo--text">$699</span> /Monthly
			      				<v-btn 			      				
			      				@click="paySubscription('monthly.standard')"
			      				:loading="loadingBtn"
			      				class="mt-2"
			      				color="warning">
			      					Pay Monthly
			      				</v-btn>		      					
		      				</v-flex>

	      				</v-layout>
	      				<div class="side-note mt-3">
	      					*15% BAL fee on offer acceptance only
	      				</div>


	      			</v-card-text>	
	      		</v-card>
	      		<!-- ///////////////////////////////////// -->
	      		<!-- STANDARD -->

	      		<!-- PREMIUM -->
	      		<!-- ///////////////////////////////////// -->
	      		<v-card class="packages">
	      			<v-card-title 
	      			class="red darken-4 white--text title"
	      			primary-title 
	      			style="text-align: left;">
	      				<h3 style="width: 100%">PREMIUM</h3>
	      				Sourcing Reinvented
	      			</v-card-title>
	      			<v-card-text>	      				
	      				<ul class="mt-3" style="text-align: left;">
	      					<li><v-icon>fas fa-check</v-icon> Inquire & source 10 items</li>
	      					<li><v-icon>fas fa-check</v-icon> Minimum order quantity: 10</li>
	      					<li><v-icon>fas fa-check</v-icon> 100% payment protection</li>
	      					<li><v-icon>fas fa-check</v-icon> Best price guarantee</li>
	      					<li><v-icon>fas fa-check</v-icon> Sample request</li>
	      					<li><v-icon>fas fa-check</v-icon> Label & design support</li>
	      					<li><v-icon>fas fa-check</v-icon> Designated lighting designer</li>
	      					<li><v-icon>fas fa-check</v-icon> Markup feature</li>
	      				</ul>
	      				<v-layout mt-4 row wrap justify-space-around>
		      				<v-flex xs6>
		      					<span class="prices red--text">$5499</span> /Yearly
			      				<v-btn 
			      				@click="paySubscription('yearly.9899')"
			      				:loading="loadingBtn"
			      				class="mt-2"
			      				color="success">
			      					Pay Yearly
			      				</v-btn>
		      				</v-flex>

		      				<v-flex xs6>		      				  
		      					<span class="prices red--text">$899</span> /Monthly
			      				<v-btn 			      				
			      				@click="paySubscription('monthly.premium')"
			      				:loading="loadingBtn"
			      				class="mt-2"
			      				color="warning">
			      					Pay Monthly
			      				</v-btn>		      					
		      				</v-flex>

	      				</v-layout>
	      				<div class="side-note mt-3">
	      					*15% BAL fee on offer acceptance only
	      				</div>

	      			</v-card-text>	
	      		</v-card>
	      		<!-- ///////////////////////////////////// -->
	      		<!-- PREMIUM -->

      		</v-layout>
        </v-card-text>


        <v-card-actions>
			<v-spacer></v-spacer>
			<v-btn
			color="primary"
			flat
			@click="closeDialog()">
				close
          	</v-btn>
        </v-card-actions>

      </v-card>


    </v-dialog>

	<form method="post" :action="creditCard.url" ref="creditCardForm">
		<input 
		type="hidden" 
		name="requestParameter" 
		:value="creditCard.requestParameter">
	</form>	

  </div>
</template>

<script>

// {
//     "id": "{{buyer_id}}",
//     "type": "subscribe",
//     "payment_method_id": 1,
//     "plan": "monthly.mini"
// }

export default {
  	
  	props:['openDialog'],
    
    data () { return {
        loadingBtn: false,
		creditCard:{
			url: null,
			requestParameter: null,
		},        
    }},

    methods:{
    	closeDialog(){
    		this.$emit('update:openDialog',false);
    	},


    	paySubscription(plan){
    		this.loadingBtn = true;
    		this.$store.dispatch(this.getStore()+'/paySubscription_a',{
    			buyer_id : this.$store.state.auth.auth_user.uuid,
    			plan : plan,
    		})
    		.then((rspns)=>{
    			this.cnsl(rspns);

				// this.cnsl('getCreditCardResource', response);
				this.creditCard.requestParameter = rspns.request_parameter;
				this.creditCard.url = rspns.request_url;

				this.$nextTick()
				.then(() => {
    				this.loadingBtn = false;

    				// this.cnsl('creditCard',this.creditCard);
					this.$refs.creditCardForm.submit();
				});

    		})
    		.catch((e)=>{
    			this.cnsl(e);
    		});
    	}
    },

}
</script>



<style scoped lang="scss">
.packages {
	margin: 20px;
    width: 320px;
	.prices {
		font-weight: bold;
		font-size: 1.3em;			
	}
	.side-note {
		font-size: 0.8em;
	}



	ul {
		li {
			margin-top: 10px;
			font-size: 0.9em;
			margin-left: 0px;
			list-style: none;

			.v-icon {
				margin-right: 10px;
				font-size: 0.9em;
			}
		}
	}
}	
</style>