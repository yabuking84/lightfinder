// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'

const base_url = config.main.apiURL;

const state = {
	api: {
		getProjectInquiries: {
			method  : 'get',
			url     : base_url+'/v1/buyer/project-inquiries',
		},
	},


}



const mutations = {



}
	
const actions = {



	getProjectInquiries_a(context, data){
		return new Promise((resolve, reject) => {

			// var headers = {token:localStorage.access_token};
			// var stage_id = (data && data.stage_id)?"stage_id="+data.stage_id:"";
			// var with_bids = (data && data.with_bids)?"with_bids="+data.with_bids:"";

			// axios({
			// 	method: state.api.getInquiries.method,
			// 	url: state.api.getInquiries.url+"?"+stage_id+"&"+with_bids,
			// 	headers: headers,
			// })
			// .then(response => {
			// 	resolve(response.data);
			// })
			// .catch(error => {
			// 	console.log('error getInquiries_a',error);
			// 	// if(actions.checkToken(error)) {                
			// 	if(context.dispatch('checkToken',error)) {
			// 		reject(error);
			// 	}
			// })


			resolve([
				{
					project_name: '2 Bedroom House',
					project_no: '122322455',
					project_type: 'House',
					target_budget: '2036',
					shipping_method: 'sea',
					description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.',
				},
				{
					project_name: '5 Bedroom Villa',
					project_no: '334322734',
					project_type: 'Villa',
					target_budget: '10500',
					shipping_method: 'sea',
					description: 'Sed ut perspiciati accusantium doloremque laudantium, totam rs et quxplicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, squia dolor sit amet, consectetur.',
				},
			]);

		});
	},



	checkToken(context,error){

		if(typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
			console.log("EXPIRED");
			router.push({'name': 'Logout'})
		}
		else {
			// reject(error);
			return true;
		}
	},


}


const getters = {

}


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions	
}






// Admin Buyanylight

// Supplier Buyanylight

// Buyer Buyanylight
// info@bal.com






// {   
//     uuid,
//     token,
//     user: {     
//         firstname,
//         lastname,
//         email,
//         role,
//         avatar,
//     },
// }