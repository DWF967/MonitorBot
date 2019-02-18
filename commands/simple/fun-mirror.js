const commando = require('discord.js-commando');

class FunMirrorCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'mirror',
            group: 'simple',
            memberName: 'mirror',
            description: 'Shows you your true self.'
        })
    }

    async run(message, args)
    {
        message.reply(message.author.avatarURL);
    }
}

module.exports = FunMirrorCommand;