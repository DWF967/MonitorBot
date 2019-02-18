const commando = require('discord.js-commando');

class NewTeamCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'newteam',
            group: 'team',
            memberName: 'newteam',
            description: 'Creates a new team'
        })
    }

    async run(message, args)
    {
        currentTeamMembers = [];
        message.reply("the current team has been reset.");
    }
}

module.exports = NewTeamCommand;