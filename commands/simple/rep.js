const commando = require('discord.js-commando');
const discord = require('discord.js');
const reputation = require('../../reputation.json');
const fs = require('fs');

class RepCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'rep',
            group: 'simple',
            memberName: 'rep',
            description: 'Shows a user\'s reputation.'
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

        let repEmbed = new discord.RichEmbed()
            .setTitle(targetUser.user.username + "'s Reputation")
            .addField("Reputation: ", (reputation[targetUser.id].rep).toString(), false);

        message.channel.send(repEmbed);

        globalFunctions.stringifyFile('reputation.json', reputation, false, "", false);

        fs.writeFile('reputation.json', JSON.stringify(reputation), function(err){
            if(err) throw err;
        });
    }
}

module.exports = RepCommand;