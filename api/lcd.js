
const { exec } = require('child_process');

module.exports = {
	print: function print(req) {
		return new Promise((resolve, reject) => {
            var msg = req.params.msg;
            var cmd = "python3 ./scripts/lcd.py '" + msg + "'";
			exec(cmd, (err, stdout, stderr) => {
				if (err){
                    console.log("Error: " + stderr);
                    reject();
                }
                else
                {
                    resolve();
                }
			});
		})
    },
}