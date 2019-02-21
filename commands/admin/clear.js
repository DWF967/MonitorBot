const commando = require('discord.js-commando');
const discord = require('discord.js');
const path = require('path')

const botConfig = require('../../botConfig.json');

class ClearCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'clear',
            group: 'admin',
            memberName: 'clear',
            description: 'Clears the amount of messages provided.'
        })
    }

    async run(message, args)
    {
        message.delete(0);

        if(!message.member.hasPermission('MANAGE_MESSAGES'))
        {
          message.channel.send("You don't have permission to use that command!").then(msg => msg.delete(5000));
          return;
        }

        if(isNaN(args))
        {
            message.channel.send(args + " is NaN. Please type a real number.").then(msg => msg.delete(5000));
            return;
        }

        message.channel.bulkDelete(args)
            .then(() => message.channel.send("Cleared " + args + " messages").then(msg => msg.delete(5000)))
            .catch(console.error());
    }
}

module.exports = ClearCommand;