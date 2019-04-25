import axios from 'axios';
import router from '@/router';
import config from '@/config/index';

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
            var hrs = d.getHours()<10?"0"+d.getHours():d.getHours();
            retVal = month[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()+" "+hrs+":"+d.getMinutes();
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
                  url:  'http://192.168.1.200:8000/v1/countries',
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


    getStore(){
        var retVal = '';

        if((localStorage.role == config.auth.role.admin.id)) {
            retVal = "admnInq";
        }
        else if(localStorage.role == config.auth.role.buyer.id) {            
            retVal = "byrInq";
        }
        else if(localStorage.role == config.auth.role.supplier.id) {
            retVal = "spplrInq";            
        }

        return retVal;
    },

    getAttachments(attachments) {
        console.log(attachments.filegroup);
        console.log(attachments.filename)
        return attachments.filegroup
    },


  },


  actions: {


  }

}