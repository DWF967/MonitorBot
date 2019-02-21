const commando = require('discord.js-commando');
const discord = require('discord.js');
const path = require('path')

const botConfig = require('../../botConfig.json');

class SayCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'say',
            group: 'admin',
            memberName: 'say',
            description: 'Tells the bot to say something.'
        })
    }

    async run(message, args)
    {
        message.delete(0);

        let words = args.split(' ');
        let phrase = words.slice(1).join(' ');

        if(!message.member.hasPermission('MANAGE_MESSAGES'))
        {
          message.channel.send("You don't have permission to use that command!").then(msg => msg.delete(5000));
          return;
        }
        if(phrase == '')
        {
            message.channel.send("I cannot say a blank phrase.").then(msg => msg.delete(5000));
            return;
        }

        message.channel.send(phrase);
    }
}

module.exports = SayCommand;