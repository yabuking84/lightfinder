import axios from 'axios';
import router from '@/router';
import config from '@/config/index';
import { ceil,floor } from 'lodash'

export default {

	methods: {

	    getDateTime(format = "yyyy-mm-dd", date){
	        let retVal = null;

	        var d = null;

	        var month = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	        if(date)
	        d = new Date(date);
	        else
	        d = new Date();

	        if(format=="yyyy-mm-dd") {
	            retVal = new Date(
	                    Date.UTC(
	                          d.getFullYear(),
	                          d.getMonth(),
	                          d.getDate(),
	                          d.getHours(),
	                          d.getMinutes(),
	                          d.getSeconds()
	                    )
	              // `toIsoString` returns something like "2017-08-22T08:32:32.847Z"
	              // and we want the first part ("2017-08-22")
	              ).toISOString().slice(0, 10);
	        } 
	        else if(format=="mmm dd, yyyy") {
	            retVal = month[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear();
	        } 
	        else if(format=="mmm dd, yyyy hh:mm") {
	            var hrs = (d.getHours()<10?"0":"")+d.getHours();
	            retVal = month[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()+" "+hrs+":"+(d.getMinutes()<10?"0":"")+d.getMinutes();
	        } 
	        else {
	            retVal = null;
	        }


	        return retVal;
	    },

	    ucwords(string){
	        string = string.trim();
	        if(string!="")
	        return string.replace(/^./, string[0].toUpperCase());
	    },


	    getCountries(context) {
	          return new Promise((resolve, reject) => {
	              axios({
	                  method: 'GET',
	                  url:  config.main.apiURL+'/v1/countries',
	              })
	              .then(response => {
	                  resolve(response.data);
	              })
	              .catch(error => {
	                  reject(error);
	              })
	          });
	    },

	    randomIndexArray: function (items) {
	      return Math.floor(Math.random() * items.length)
	    },


	    isRole(roleName){

	        var retVal = false;

	        if(roleName == 'admin') {
	            retVal = (localStorage.role == config.auth.role.admin.id)?true:false;
	        }
	        else if(roleName == 'buyer') {
	            retVal = (localStorage.role == config.auth.role.buyer.id)?true:false;
	        }
	        else if(roleName == 'supplier') {
	            retVal = (localStorage.role == config.auth.role.supplier.id)?true:false;
	        }

	        return retVal;

	    },


	    getRole(){
	        var retVal = false;
	        var roleId = this.$store.state.auth.auth_user.role;
	        return {
	        	id: roleId,
	        	name: config.auth.roleIndex[roleId],
	        };
	    },


	    getStore(type='inq'){

	    	// this.cnsl('$route',this.$route.meta.storeType[type]);

	        // return this.$route.meta.storeType.inq;
	        return this.$route.meta.storeType[type];
	    },

	    getAttachments(attachments) {
	        this.cnsl(attachments.filegroup);
	        this.cnsl(attachments.filename)
	        return attachments.filegroup
	    },


		currency(arg,decimals=2){
			// return ceil(arg,2).toFixed(2)
			// return this.numberWithCommas(arg.toFixed(2));
			
			// this.cnsl('arg 1',arg);

			if(typeof arg === 'undefined')
			arg = 0.0;
			else if(!arg)
			arg = 0.0;
			else
			arg = parseFloat(arg);

			// this.cnsl('arg 2',arg);

			return this.numberWithCommas(arg.toFixed(decimals));
		},

		decimals(arg,decimals=2){
			// return ceil(arg,2).toFixed(2)
			// return this.numberWithCommas(arg.toFixed(2));
			if(arg)
			return parseFloat(arg).toFixed(decimals);
			else
			return 0;
		},


		numberWithCommas(x) {
		    var parts = x.toString().split(".");
		    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		    return parts.join(".");
		},


		cnsl(output1,output2=null){

			if(config.main.devMode) {
				if(output2)
				console.log(output1,output2);
				else
				console.log(output1);
			}
		},


	},



}