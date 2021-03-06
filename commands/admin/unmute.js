const commando = require('discord.js-commando');
const discord = require('discord.js');
const path = require('path')

const botConfig = require('../../botConfig.json');

class UnmuteCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'unmute',
            group: 'admin',
            memberName: 'unmute',
            description: 'Unmutes a user in the guild.'
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

        let words = args.split(' ');
        let reason = words.slice(1).join(' ');

        let muteRole = botConfig["roles"].mute;
        
        let embed = new discord.RichEmbed()
            .setTitle("**__Unmute__**")
            .setColor("0xff00ff")
            .addField("**" + targetUser.user.username + "**", "Unmuted by " + "***" + message.author.username + "***" + " for " + reason + ".", false)
            .setThumbnail(targetUser.user.avatarURL)
            .setFooter(message.author.username, message.author.avatarURL)
            .setTimestamp(Date());

        if(!message.member.hasPermission('MANAGE_MESSAGES'))
        {
          message.channel.send("You don't have permission to use that command!");
          return;
        }
        
        message.guild.member(targetUser).removeRole(targetUser.guild.roles.find(role => role.name === muteRole))
            .then(console.log)
            .catch(console.error);

        let staffLog = message.member.guild.channels.find(channel => channel.name === botConfig["channels"].staff_log);

        staffLog.send(embed);
    }
}

module.exports = UnmuteCommand;