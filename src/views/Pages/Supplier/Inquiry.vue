<template>
	<div>
		<v-container fluid>

		  	<v-layout row wrap>
				<v-flex>
			  		<inquiries-table></inquiries-table>
				</v-flex>
		  	</v-layout>


		</v-container>
	</div>
</template>

<script>



import InquiriesTable from "@/views/Components/App/Supplier/InquiriesTable"

// import OpenInquiry from '@/views/'
export default {

	components: {
		InquiriesTable,
	},

	data: () => ({
		component: InquiriesTable,
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