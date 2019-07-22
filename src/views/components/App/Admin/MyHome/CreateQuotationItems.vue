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
		<image-upload></image-upload>
	</td>
	<td width="20%">
		<v-text-field outline flat
		label="Item No."
		@input="atInput(item, 'item_no', $event)">
		</v-text-field>

		<v-text-field outline flat
		label="Reference"
		@input="atInput(item, 'ref', $event)">
		</v-text-field>

		<v-text-field outline flat
		label="Title"
		@input="atInput(item, 'title', $event)">
		</v-text-field>

		<v-text-field outline flat
		label="Other Field"
		@input="atInput(item, 'field', $event)">
		</v-text-field>


	</td>

	<td width="15%">
		<v-text-field outline flat
		type="number"
		label="Quantity"
		@input="atInput(item, 'quantity', $event)">
		</v-text-field>

		<v-text-field outline flat		
		type="number"
		label="Unit Price"
		prefix="$"
		placeholder="0.00"		
		@input="atInput(item, 'unit_price', $event)">
		</v-text-field>
	</td>
	
	<td>
		<v-textarea outline flat
		label="Description"
		:value="item.desc"
		@input="atInput(item, 'desc', $event)">
		</v-textarea>		
	</td>

	<td width="20%">

		<v-text-field outline flat
		type="number"
		label="Sample Quantity"
		@input="atInput(item, 'sample_quantity', $event)">
		</v-text-field>

		<v-text-field outline flat		
		type="number"
		label="Sample Unit Price"
		prefix="$"
		placeholder="0.00"		
		@input="atInput(item, 'sample_unit_price', $event)">
		</v-text-field>

		<v-text-field outline flat		
		type="number"
		label="Sample Shipment Price Qty < 5"
		prefix="$"
		placeholder="0.00"		
		@input="atInput(item, 'sample_shipment_price_less_5', $event)">
		</v-text-field>

		<v-text-field outline flat		
		type="number"
		label="Sample Shipment Price Qty 5 - 10"
		prefix="$"
		placeholder="0.00"		
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

import ImageUpload from "@/views/Components/App/Admin/MyHome/QuotationItemFile"

import Vue from 'vue'

function item() { 	
	this.image_url =  null;
	this.item_no =  null;
	this.ref =  null;
	this.title =  null;
	this.desc =  null;
	this.field =  null;
	this.quantity =  0;
	this.unit_price =  0.00;

	this.sample_unit_price =  0.00;	
	this.sample_quantity =  0;
	this.sample_shipment_price_less_5 =  0.00;	
	this.sample_shipment_price_5_10 =  0.00;	
};


export default {
props:{
	bus: {
		type: Object,
		required: true,
	},
},

components: {
	ImageUpload,
},

	
validations: {
	formData: {
		items: { required, },
	},
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
	});
},

watch:{

},



methods: {
	checkErrors(){

	},

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

















</style>

