const commando = require('discord.js-commando');
const discord = require('discord.js');
const path = require('path');
const fs = require('fs');

const reports = require('../../reports.json');

class InfractionsCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'infractions',
            group: 'admin',
            memberName: 'infractions',
            description: 'Displays a user\'s infractions.'
        })
    }

    async run(message, args)
    {
        let targetUser = message.guild.member(message.mentions.users.first());

        if(!targetUser)
        {
            message.channel.send("Sorry, I couldn't find that user.");
            return;
        }

        let id = targetUser.id;

        if(!message.member.hasPermission('MANAGE_MESSAGES'))
        {
          message.channel.send("You don't have permission to use that command!");
          return;
        }
        if(!reports[id])
        {
            message.channel.send("Sorry, that user doesn't have any infractions.")
            return;
        }

        let embed = new discord.RichEmbed()
            .setTitle("**__Infractions of " + targetUser.user.username + "__**")
            .setColor("0x6fd500")
            .addField("**Warnings**", reports[id].warning_reasons, true)
            .addField("**Reports**", reports[id].report_reasons, true)
            .setThumbnail(targetUser.user.avatarURL)
            .setFooter(message.author.username, message.author.avatarURL)
            .setTimestamp(Date());

        message.channel.send(embed);
    }
}

module.exports = InfractionsCommand;