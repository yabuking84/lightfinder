<template>
	<div>
		<v-container fluid>

		  	<v-layout row wrap>
				<v-flex>
			  		<inquiries-table-grid></inquiries-table-grid>
				</v-flex>
		  	</v-layout>


		</v-container>
	</div>
</template>

<script>



import InquiriesTableGrid from "@/views/Components/App/InquiriesTableGrid"

// import OpenInquiry from '@/views/'
export default {

	components: {
		InquiriesTableGrid,
	},

	data: () => ({
		isConnected: false,
		
		messages: "",
		message: "",
		name: "",
	}),

	created() {

	},

	methods: {


	},

	sockets: {
	    connect() {
            // Fired when the socket connects.
            this.isConnected = true;
        },

        disconnect() {
            this.isConnected = false;
        },



	},



}

</script>