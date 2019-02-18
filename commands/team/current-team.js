const commando = require('discord.js-commando');
const discord = require('discord.js');

class CurrentTeamCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'currentteam',
            group: 'team',
            memberName: 'currentteam',
            description: 'Shows you the current team members.'
        })
    }

    async run(message, args)
    {
        var teamInfo = new discord.RichEmbed().setTitle("Current team members:").setColor(0x00ffff);
    
        for(var i = 0; i < currentTeamMembers.length; i++)
        {
            teamInfo.addField("**__Member " + (i+1).toString() + ": __**", currentTeamMembers[i].username);
        }
    
        message.channel.send(teamInfo);
    }
}

module.exports = CurrentTeamCommand;