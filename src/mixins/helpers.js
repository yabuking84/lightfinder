export default {
  methods: {

    getDateTime(format = "yyyy-mm-dd"){
      let retVal = null;

      const d = new Date();

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
      } else {
            retVal = null;
      }


      return retVal;
    },

    ucwords(string){
        return string.replace(/^./, string[0].toUpperCase());
    },

  },
}