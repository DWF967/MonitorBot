const commando = require('discord.js-commando');
const reputation = require('../../reputation.json');
const fs = require('fs');

class PlusRepCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'plusrep',
            group: 'simple',
            memberName: 'plusrep',
            description: 'Adds reputation to the user.'
        })
    }

    async run(message, args)
    {
        let targetUser = message.guild.member(message.mentions.users.first());

        if(!targetUser)
        {
            message.channel.send("Sorry, I couldn't find that user.")
            return;
        }
        if(!reputation[targetUser.id])
        {
            reputation[targetUser.id] = {
                rep: 0
            };
        }
        reputation[targetUser.id].rep = reputation[targetUser.id].rep + 1;

        globalFunctions.stringifyFile('reputation.json', reputation, true, "Added 1 rep to " + targetUser.user.username + "!", false);
    }
}

module.exports = PlusRepCommand;