var logUpdate = require('log-update');

(function myLoop (i) {          
   setTimeout(function () {   
        logUpdate('Index is '+i)
        if (--i) myLoop(i);
     }, 1000)
})(10);
