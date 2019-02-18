const commando = require('discord.js-commando');
const discord = require('discord.js');
const path = require('path');

const botConfig = require('../../botConfig.json');

class KickCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'kick',
            group: 'admin',
            memberName: 'kick',
            description: 'Kicks a user from the guild.'
        })
    }

    async run(message, args)
    {
        let targetUser = message.guild.member(message.mentions.users.first());

        let words = args.split(' ');
        let reason = words.slice(1).join(' ');

        let embed = new discord.RichEmbed()
            .setTitle("**__Kick__**")
            .setColor("0xFFFF00")
            .addField("**" + targetUser.user.username + "**", "Kicked from the server by " + "***" + message.author.username + "***" + " for " + reason + ".", false)
            .setThumbnail(targetUser.user.avatarURL)
            .setFooter(message.author.username, message.author.avatarURL)
            .setTimestamp(Date());

        if(!targetUser)
        {
            message.channel.send("Sorry, I couldn't find that user.");
            return;
        }
        if(!message.member.hasPermission('MANAGE_MESSAGES'))
        {
          message.channel.send("You don't have permission to use that command!");
          return;
        }

        message.guild.member(targetUser).kick(reason)
            .then(console.log)
            .catch(console.error);

        let staffLog = message.member.guild.channels.find(channel => channel.name === botConfig["channels"].staff_log);

        staffLog.send(embed);
    }
}

module.exports = KickCommand;