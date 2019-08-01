<template>

<table width="100%">
<thead>
	<tr>
		<th></th>
		<th></th>
		<th></th>
		<th></th>
		<th></th>
		<th></th>
	</tr>
</thead>

<tbody>

<template v-for="(item,i) in items">	
<tr :key="'item_'+i">
	<td width="20%">
		<h3>Image</h3>
		<!-- <img v-if="item.image" :src="item.image"> -->
		
		<image-view
		v-if="item.image"
		width="70px" height="70px" 
		:src="item.image"></image-view>


		<image-upload
		disable-clear-images
		@update:image="atInput(item, 'image', $event)">
		</image-upload>
	</td>
	<td width="20%">
		<v-text-field outline flat
		label="Item No."
		:value="item.item_number"
		@input="atInput(item, 'item_number', $event)">
		</v-text-field>

		<v-text-field outline flat
		label="Reference"
		:value="item.reference"
		@input="atInput(item, 'reference', $event)">
		</v-text-field>

		<v-text-field outline flat
		label="Title"
		:value="item.name"
		@input="atInput(item, 'name', $event)">
		</v-text-field>

		<v-text-field outline flat
		label="Other Field"
		:value="item.field"
		@input="atInput(item, 'field', $event)">
		</v-text-field>


	</td>

	<td width="15%">
		<v-text-field outline flat
		type="number"
		label="Quantity"
		:value="item.quantity"
		@input="atInput(item, 'quantity', $event)">
		</v-text-field>

		<v-text-field outline flat		
		type="number"
		label="Unit Price"
		prefix="$"
		placeholder="0.00"		
		:value="item.price"
		@input="atInput(item, 'price', $event)">
		</v-text-field>
	</td>
	
	<td>
		<v-textarea outline flat
		label="Description"
		:value="item.description"
		@input="atInput(item, 'description', $event)">
		</v-textarea>		
	</td>

	<td width="20%">

		<!-- <v-text-field outline flat
		type="number"
		label="Sample Quantity"
		@input="atInput(item, 'sample_quantity', $event)">
		</v-text-field> -->

		<v-text-field outline flat		
		type="number"
		label="Sample Unit Price"
		prefix="$"
		placeholder="0.00"		
		:value="item.sample_price"
		@input="atInput(item, 'sample_price', $event)">
		</v-text-field>

		<v-text-field outline flat		
		type="number"
		label="Sample Shipment Price Qty < 5"
		prefix="$"
		placeholder="0.00"		
		:value="item.sample_shipment_price_less_5"
		@input="atInput(item, 'sample_shipment_price_less_5', $event)">
		</v-text-field>

		<v-text-field outline flat		
		type="number"
		label="Sample Shipment Price Qty 5 - 10"
		prefix="$"
		placeholder="0.00"		
		:value="item.sample_shipment_price_5_10"
		@input="atInput(item, 'sample_shipment_price_5_10', $event)">
		</v-text-field>
	</td>

	<td>
		<v-btn     	
		fab flat small 
		@click="removeInput(i)"
		class="black white--text mt-0">
			<v-icon>fas fa-close</v-icon> 
		</v-btn> 
	</td>
</tr>
<tr v-if="i<items.length-1">
	<td colspan="6">
		<v-divider class="mb-4 mt-3"></v-divider>
	</td>
</tr>
</template>

</tbody>


</table>
</template>


<script>
import validationMixin from '@/mixins/validationMixin'
import { required, decimal } from 'vuelidate/lib/validators'


import ImageUpload from "@/views/Components/App/Admin/MyHome/Project/CreateQuotation/CreateQuotationItemFile"
import ImageView from "@/views/Components/App/Admin/MyHome/ImageView";

import Vue from 'vue'

function item() { 	
  
    this.item_number                      = null;
    this.image                            = null;
    this.reference                        = null;
    this.name                             = null;
    this.description                      = null;
    this.field                            = null;
    this.price                            = 0;
    this.quantity                         = 0;
    this.discount                         = 0;
    this.sample_price                     = 0;
    this.sample_quantity                  = 0;
    this.sample_shipment_price_less_5     = 0;
    this.sample_shipment_price_5_10       = 0;
        

};


export default {
props:{
	itemsProp: {
		type: Array,
		default:()=>([]),
	},
	bus: {
		type: Object,
		required: true,
	},
},

components: {
	ImageUpload,
	ImageView,
},

	
validations: {
	// formData: {
	// 	items: { required, },
	// },
},


data() { return {
	items: [],
}},


created(){
	this.bus.$on('add-item',()=>{
		this.items.push(new item());
		this.emitData();
	});
	this.bus.$on('reset-items',()=>{
		this.items = [];
		this.emitData();
	});

	// console.log('zzzzzz',this.itemsProp);
	this.items = this.itemsProp;

},

watch:{
	itemsProp:{
		handler(nVal,oVal){
			this.items = this.itemsProp;
		},
		deep:true,
	},
},



methods: {

	atInput(item, property, value){
		item[property] = value;
		this.emitData();
	},

	removeInput(i){
		console.log(this.items);
		// this.items.splice(i,1);
		this.$delete(this.items,i);
		this.emitData();
	},

	emitData(){
		this.$emit('update:items', this.items);
	},
},

computed:{

},

}	
</script>


<style scoped lang="scss">
	
.v-textarea:not(.v-input--is-focused):not(.v-input--has-state) /deep/ > .v-input__control > .v-input__slot:hover,
.v-textarea /deep/ > .v-input__control > .v-input__slot,
.v-textarea /deep/ > .v-input__control > .v-input__slot:hover {
	border: 1px solid rgba(0,0,0,0.54);
}
// .v-textarea > .v-input__control > .v-input__slot:hover

th {
	text-align: left;
	padding-left: 10px;
	padding-bottom: 15px;
}

td {
	padding: 0px 10px;
	vertical-align: top;

	// v-text-field
	////////////////////////////////////////
	.v-text-field /deep/ {
		.v-text-field__prefix,
		input {
			// margin-top: 0px;
		}
		.v-text-field__details {
			display: none;
		}
	}
	.v-text-field--outline /deep/ {
		> .v-input__control > .v-input__slot {
			// min-height: 40px;
			border: solid 1px gainsboro;
		}		
	}
	.v-text-field:not(.v-input--is-focused):not(.v-input--has-state) > /deep/ .v-input__control > .v-input__slot:hover {
		border: 1px solid #000;
	}
	////////////////////////////////////////
	// v-text-field



	.v-btn--floating.v-btn--small {
		height: 30px;
		width: 30px;		
	}
}

.v-text-field /deep/ {
	.v-text-field__prefix {
		margin-top:22px;
	}
}




</style>

