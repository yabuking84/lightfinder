<template>
	<v-container>
	  	<v-layout row wrap mt-4>
	  	  	<v-flex xs12>
	  	  		<v-flex xs10 offset-xs1>
	  	  			<v-text-field  color="black" label="First Name" required></v-text-field>  
	  	  		</v-flex>
	  	  		<v-flex xs10 offset-xs1>
	  	  		    <v-text-field  color="black" label="Last Name" required></v-text-field>
	  	  		</v-flex>
	  	  		<v-flex xs10 offset-xs1>
	  	  		    <v-text-field  color="black" label="Phone Number" required></v-text-field>
	  	  		</v-flex>
	  	  		<v-flex xs10 offset-xs1>
	  	  		    <v-text-field  color="black" label="Company Name" required></v-text-field>
	  	  		</v-flex>
	  	  		<v-flex xs10 offset-xs1>
	  	  		     <v-select color="black" label="Country" data-vv-name="Country" required ></v-select>  
	  	  		</v-flex>
	  	  	</v-flex>
	  	</v-layout>
	</v-container>
</template>