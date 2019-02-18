const commando = require('discord.js-commando');
const discord = require('discord.js');
const path = require('path')

const botConfig = require('../../botConfig.json');
const gameScores = require('../../gameScores.json');
const reports = require('../../reports.json');
const reputation = require('../../reputation.json');

class FetchDataCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'fetchdata',
            group: 'admin',
            memberName: 'fetchdata',
            description: 'Fetches a file and displays the contents.'
        })
    }

    async run(message, args)
    {
        var gsData = JSON.stringify(gameScores, null, 2);
        var bcData = JSON.stringify(botConfig, null, 2);
        var reportsData = JSON.stringify(reports, null, 2);
        var reputationData = JSON.stringify(reputation, null, 2);

        if(args == "botConfig.json") message.channel.sendCode('json', bcData)
        else if(args == "gameScores.json") message.channel.sendCode('json', gsData)
        else if(args == "reports.json") message.channel.sendCode('json', reportsData)
        else if(args == "reputation.json") message.channel.sendCode('json', reputationData)
        else if(args == "*")
        {
            message.channel.sendCode('json', bcData);
            message.channel.sendCode('json', gsData);
            message.channel.sendCode('json', reportsData);
            message.channel.sendCode('json', reputationData);
        }
        else message.channel.send("Please type a file's name to display it's contents or a \"*\" to display the contents of all files.");
    }
}

module.exports = FetchDataCommand;