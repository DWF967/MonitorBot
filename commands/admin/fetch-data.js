const commando = require('discord.js-commando');
const discord = require('discord.js');
const path = require('path')

const botConfig = require('../../botConfig.json');
const gameScores = require('../../gameScores.json');
const reports = require('../../reports.json');
const reputation = require('../../reputation.json');
const pvt = require('../../pvt.json');

const files = {'botConfig.json': botConfig, 'gameScores.json': gameScores, 'reports.json': reports, 'reputation.json': reputation, 'pvt.json': pvt};

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
        if(!message.member.hasPermission('ADMINISTRATOR'))
        {
          message.channel.send("You don't have permission to use that command!");
          return;
        }

        if(files[args]) message.channel.sendCode('json', JSON.stringify(files[args], null, 2))
        
        else if(args == "*")
        {
            message.channel.sendCode('json', JSON.stringify(botConfig, null, 2));
            message.channel.sendCode('json', JSON.stringify(gameScores, null, 2));
            message.channel.sendCode('json', JSON.stringify(reports, null, 2));
            message.channel.sendCode('json', JSON.stringify(reputation, null, 2));
            message.channel.sendCode('json', JSON.stringify(pvt, null, 2));
        }
        
        else message.channel.send("Please type a file's name to display it's contents or a \"*\" to display the contents of all files.");
    }
}

module.exports = FetchDataCommand;