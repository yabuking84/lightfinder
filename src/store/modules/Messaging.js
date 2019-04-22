// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'


const state = {


}



const mutations = {



}
    
const actions = {

    sendMessageToBid_a(context,data){
        return new Promise((resolve, reject) => {
            resolve();
        });
    },

    getBidMessages_a(context,data){
        return new Promise((resolve, reject) => {

            // var headers = {token:localStorage.access_token};
            // axios({
            //     method: state.api.getInquiries.method,
            //     url: state.api.getInquiries.url,
            //     headers: headers,
            // })
            // .then(response => {
            //     resolve(response.data);
            // })
            // .catch(error => {
            //     // console.log(error);
            //     if(actions.checkToken(error)) {
            //         reject(error);
            //     }
            // })

            setTimeout(function(){
                resolve([
                    {

                        uuid: '7df3bad6-3d84-11e9-a032-0a0027000001',
                        name: "Dane Joh ADMIN",
                        text:"HEY LOREM Upsipiums sad",
                    },
                ]);
            }, 2000);
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


