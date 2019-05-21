<template>
	<div>
		<v-container fluid>

		  	<v-layout row wrap>
				<v-flex>
			  		<inquiries-grid></inquiries-grid>
				</v-flex>
		  	</v-layout>


		</v-container>
	</div>
</template>

<script>



import InquiriesGrid from "@/views/Components/App/Supplier/InquiriesGrid"

// import OpenInquiry from '@/views/'
export default {

	components: {
		InquiriesGrid,
	},

	data: () => ({
		component: InquiriesGrid,
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