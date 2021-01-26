const { exec } = require('child_process')

module.exports = {
    terminal: function terminal(req) {
        return new Promise((resolve, reject) => {
            var cmd = req.params.cmd.replace(/zzz/g, '/');
            String.prototype.replaceAll = function (search, replacement) {
                var target = this;
                return target.replace(new RegExp(search, 'g'), replacement);
            };

            exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    reject(stderr + "<br>");
                }
                else {
                    stdout = stdout.replaceAll(" ", '&nbsp;');
                    stdout = stdout.replaceAll("\n", "<br>");
                    resolve(stdout);
                }
            });
        });
    }
}