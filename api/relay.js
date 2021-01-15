const fs = require('fs');
const { exec } = require('child_process');
const { resolve } = require('path');

module.exports = {
	activateRelay: function activateRelay(req) {
		return new Promise((resolve, reject) => {
			var relayNum = req.params.relayNum;
			var cmd = './api/c/relaydriver ' + relayNum;

			exec(cmd, (err, stdout, stderr) => {
				if (err)
					reject({ status: 500, msg: "relay.js: ERROR (relay.js): " + JSON.stringify(stderr) });
				else
					resolve({ status: 200, msg: stdout });
			});
		})
	},

	checkStatus: function checkStatus(req) {
		return new Promise((resolve, reject) => {
			var relayNum = req.params.relayNum;
			var cmd = './api/c/statusdriver ' + relayNum;

			exec(cmd, (err, stdout, stderr) => {
				console.log("stdout: " + stdout);
				if (err)
					reject({ status: 500, msg: stderr });
				else
					resolve({ status: 200, msg: stdout });
			});
		})
	}
}
