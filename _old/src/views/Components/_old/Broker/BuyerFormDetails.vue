<template>
	<v-container>
	  	<v-layout row wrap mt-4>
	  	  	<v-flex xs12>
	  	  		<v-flex xs9 >
	  	  			<v-text-field  color="black" label="Brand Name" required></v-text-field>  
	  	  		</v-flex>
	  	  		<v-flex xs9>
	  	  		    <v-text-field  color="black" label="Factory Name" required></v-text-field>
	  	  		</v-flex>
	  	  		<v-flex xs9>
	  	  		    <v-text-field  color="black" label="Address" required></v-text-field>
	  	  		</v-flex>
	  	  		<v-flex xs9>
					<v-layout row wrap>
			  	  		<v-flex xs6 pr-1>
			  	  		   <v-select color="black" label="Country" data-vv-name="Country" required ></v-select>  
						</v-flex>	
						<v-flex xs6>
							 <v-select color="black" label="No. Employee" data-vv-name="Country" required ></v-select>  
						</v-flex>	
					</v-layout>
	  	  		</v-flex>
	  	  		<v-flex xs9>
	  	  		     <v-textarea color="black" name="input-7-4" label="Company Description" value="" ></v-textarea>
	  	  		</v-flex>
	  	  	</v-flex>
	  	</v-layout>
	</v-container>
</template>