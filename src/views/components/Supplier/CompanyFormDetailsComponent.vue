<template>
	<v-container>
	  	<v-layout row wrap mt-4>
	  	  	<v-flex xs6>
	  	  		<v-flex xs9 offset-xs1>
	  	  			<v-text-field  color="black" label="Brand Name" required></v-text-field>  
	  	  		</v-flex>
	  	  		<v-flex xs9 offset-xs1>
	  	  		    <v-text-field  color="black" label="Factory Name" required></v-text-field>
	  	  		</v-flex>
	  	  		<v-flex xs9 offset-xs1>
	  	  		    <v-text-field  color="black" label="Address" required></v-text-field>
	  	  		</v-flex>
	  	  		<v-flex xs9 offset-xs1>
					<v-layout row wrap>
			  	  		<v-flex xs6 pr-1>
			  	  		   <v-select color="black" label="Country" data-vv-name="Country" required ></v-select>  
						</v-flex>	
						<v-flex xs6>
							 <v-select color="black" label="No. Employee" data-vv-name="Country" required ></v-select>  
						</v-flex>	
					</v-layout>
	  	  		</v-flex>
	  	  		<v-flex xs9 offset-xs1>
	  	  		     <v-textarea color="black" name="input-7-4" label="Company Description" value="" ></v-textarea>
	  	  		</v-flex>
	  	  	</v-flex>
	  	  	<v-flex xs6>
	  	  	  		<v-flex xs9 offset-xs1>
						<v-layout row wrap>
				  	  		<v-flex xs6 pr-1>
				  	  		  <v-text-field  color="black" label="Owner First Name" required></v-text-field>  
							</v-flex>	
							<v-flex xs6>
								<v-text-field  color="black" label="Owner Last Name" required></v-text-field>  
							</v-flex>	
						</v-layout>
	  	  			</v-flex>
	  	  		  	 <v-flex xs9 offset-xs1>
	  	  		    	<v-text-field  color="black" label="Contact Person" required></v-text-field>
	  	  			</v-flex>
	  	  			 <v-flex xs9 offset-xs1>
	  	  		    	<v-text-field  color="black" label="Job Title" required></v-text-field>
	  	  			</v-flex>
	  	  			<v-flex xs9 offset-xs1>
	  	  		    	<v-text-field  color="black" label="Telephone Number" required></v-text-field>
	  	  			</v-flex>
	  	  			<v-flex xs9 offset-xs1>
	  	  		    	<v-text-field  color="black" label="Fax" required></v-text-field>
	  	  			</v-flex>
	  	  	</v-flex>
	  	</v-layout>
	</v-container>
</template>