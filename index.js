promptForConfigFilePath();
function promptForConfigFilePath() {
    var inquirer = require('inquirer');

    var questions = [
        {
            type: 'input',
            name: 'configFilePath',
            message: 'Enter config file path...'
        }
    ];

    inquirer.prompt(questions).then(function (answers) {
        var configFilePath = "./sample-config.json";
        configFilePath = answers.configFilePath;
        createProxyServer(configFilePath);
    });
}

function createProxyServer(configFilePath) {
    var subdomain = require('express-subdomain');
    var express = require('express');
    var app = express();
    var morgan = require('morgan');
    var httpProxy = require('http-proxy');
    var proxyServer = httpProxy.createProxyServer();

    var serverData = readConfigurationFile(configFilePath);
    if(!serverData){
        console.log("Enter a valid config file path");
        console.log("Aborting task...");
        return false;
    }
    var configs = {};
    for (var subDomain in serverData) {
        configs[subDomain]  = {
            server:serverData[subDomain],
            router: express.Router()
        }
    }

    for(var subDomain in configs){
        configs[subDomain].router.get('/', function (req, res) {
            if(req){
                var reqSubdomain = req.headers.host.split('.')[0];
                console.log("Redirecting to " + configs[reqSubdomain].server);
            }
            proxyServer.web(req, res, {target: configs[reqSubdomain].server});
        })

        app.use(subdomain(subDomain,configs[subDomain].router));
    }


    app.get('/', function (req, res) {
        res.send('Homepage');
    });
    app.use(morgan('tiny'));

    console.log('Listening on port 80...');
    app.listen(80);
}





function readConfigurationFile(configFilePath) {
    var fs = require('fs');
    var data;
    try {
        data = fs.readFileSync(configFilePath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log(configFilePath + " file not found!");
        } else {
            console.log("Unknown error in " + configFilePath);
        }
        return false;
    }
    data = JSON.parse(data);
    return data;
}
