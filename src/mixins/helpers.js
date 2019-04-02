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


    getCountries_a() {

          // var res;

          // axios({
          //     method: 'GET',
          //     url: 'http://192.168.1.200:8000/v1/countries'
          //   })
          //   .then(response => {
          //     resolve(response.data);
          //     // return 
          //     // res = response.data;
          //   })
          //   .catch(error => {
          //     reject(error);
          // })

            // console.log(res);
          // return res;

  }




  },


  actions: {


  }

}