const { exec } = require('child_process');

// Relay GPIO pins
let relayMap = [0, 19, 20, 21, 22, 23, 24, 25, 26];

module.exports = {
	activateRelay: function activateRelay(req) {
		return new Promise((resolve, reject) => {

			var param = req.params.relayNum;
			var relayNum = relayMap[param];
			var cmd = './scripts/relaydriver.exe ' + relayNum;

			exec(cmd, (err, stdout, stderr) => {
				if (err){
					console.log("Relay.js ERROR: " + stderr);
					reject({ status: 500, msg: "Relay is busy, try again." });
				}
				else
					resolve({ status: 200, status: stdout });
			});
		})
	},

	checkStatus: function checkStatus(req) {
		return new Promise((resolve, reject) => {
			var relayNum = req.params.relayNum;
			var cmd = './api/c/statusdriver.exe ' + relayNum;

			exec(cmd, (err, stdout, stderr) => {
				if (err)
					reject({ status: 500, msg: stderr });
				else
					resolve({ status: 200, msg: stdout });
			});
		})
	}
}
