// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'

import config from '@/config/index'


const state = {

    api: {
        sendMessage: {
            method  : 'post',
            url     : 'http://192.168.1.200:8000/v1/messages',
        },        
        getMessages: {
            method  : 'get',
            url     : 'http://192.168.1.200:8000/v1/messages',
        },
    },

    testMessages: [],
}



const mutations = {



}
    
const actions = {

    sendMessage_a(context,data){
        return new Promise((resolve, reject) => {
            
            if(data.type == 'bid.buyer.admin') {
                context.dispatch('sendMessageToBid_a',data)
                .then(function(){                    
                    resolve();
                })
                .catch(error => {
                    reject(error)
                });
            } 
            else 
            reject('no message type!');

        });
    },

    // bid messages
    ///////////////////////////////////////////////////////////////
    sendMessageToBid_a(context,data){
        return new Promise((resolve, reject) => {

            console.log("data stringify",JSON.stringify(data));

            var headers = {
                token:localStorage.access_token,
                "content-type": "application/json",
            };
            axios({
                method: state.api.sendMessage.method,
                url: state.api.sendMessage.url,
                headers: headers,
                data: JSON.stringify(data),
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                // console.log(error);
                if(context.dispatch('checkToken',error))
                reject(error);
                
            })

            // testMessages
            // testtesttesttesttesttesttesttesttesttesttesttesttesttest
            // context.commit('INSERTTM_M',{
            //     own: 1,
            //     content: data.content,
            // });
            // context.commit('INSERTTM_M',{
            //     own: 0,
            //     content:"HEY LOREM Upsipiums sad",
            // });                
            // resolve();
            // testtesttesttesttesttesttesttesttesttesttesttesttesttest
            // testMessages
        });
    },

    getBidMessages_a(context,data){
        return new Promise((resolve, reject) => {
            var headers = {
                token:localStorage.access_token,
            };
            axios({
                method: state.api.getMessages.method,
                url: state.api.getMessages.url+"?type="+data.type+"&"+"id="+data.id,
                headers: headers,
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                if(context.dispatch('checkToken',error))
                reject(error);
                else
                console.log(error);
            })

            // testMessages
            // testtesttesttesttesttesttesttesttesttesttesttesttesttest
            // setTimeout(function(){ 
            //     var newArr = [...state.testMessages];
            //     resolve(newArr);
            // }, 2000);
            // testtesttesttesttesttesttesttesttesttesttesttesttesttest
            // testMessages

        });
    },
    ///////////////////////////////////////////////////////////////
    // bid messages



    checkToken(context, error){

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


