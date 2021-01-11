const fs = require('fs');
const { exec } = require('child_process');

module.exports = {
	activateRelay : function activateRelay(req) {
    	return new Promise((resolve, reject) => {
			var relayNum = req.params.relayNum;
			var cmd = 'ls';
			console.log("DUDE: we've got this number from front end: " + relayNum);

         	exec(cmd, (err, stdout, stderr ) =>{
	    		if(err){
	       			console.log("ERROR Irrigation server: " + stderr);
	       			reject({ status: 500, msg: "unable to run the command"});
				} else {
					console.log("Irrigation server command ran fine." );
					resolve({ status: 200, msg: stdout});
				}
			
			});
      	}) 
   	}
}
