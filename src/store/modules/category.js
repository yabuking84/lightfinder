// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'

const base_url = config.main.appUrl;

const state = {

}



const mutations = {

}

    
const actions = {
    getCategories_a(context){

        return new Promise((resolve, reject) => {
            var url = base_url+"/v1/categories";

            axios({
                method: 'get',
                url: url,
            })
            .then(response => {
                
                response.data.map(function(d){
                    d.name = d.name.trim();
                    return d;
                });
                resolve(response.data);
            })
            .catch(error => {
                reject(error)
            })


            // Simulated ajax query
            // setTimeout(() => {
            //     resolve([
            //         'LED Batten Lights',
            //         'LED Bulkheads',
            //         'LED Canopy Lights',
            //         'LED Ceiling Lights',
            //         'LED Chandeliers',
            //         'LED Classic Chandeliers',
            //         'LED Crystal Lights',
            //         'LED Deck Lights',
            //         'LED Downlights',
            //         'LED Emergency Lights',
            //         'LED Garden Lights',
            //         'LED Indoor Wall Lights',
            //         'LED Industrial Lights',
            //         'LED Linear In-ground Lights',
            //         'LED Linear Lights',
            //         'LED Mirror Lights',
            //         'LED Mirrors',
            //         'LED Panel Lights',
            //         'LED Pendant Lights',
            //         'LED Smarthome',
            //         'LED Spotlights',
            //         'LED Street Lights',
            //         'LED Strip Lights',
            //         'LED Track Lights',
            //         'LED Tubes',
            //         'LED Underwater Lights',
            //         'LED Wall & Recessed Lights',
            //         'LED Wall Washer',
            //     ]);
            // },500);


        });
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