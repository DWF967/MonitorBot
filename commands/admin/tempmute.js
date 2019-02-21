const commando = require('discord.js-commando');
const discord = require('discord.js');
const path = require('path')

const botConfig = require('../../botConfig.json');

class TempmuteCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'tempmute',
            group: 'admin',
            memberName: 'tempmute',
            description: 'Temporarily mutes a user in the guild for a specified amount of hours.'
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
        let time = words.slice(1).join(' ');

        if(isNaN(time))
        {
            message.channel.send(time + " is NaN. Please say the number of hours you want to mute that person.");
            return;
        }

        let muteRole = botConfig["roles"].mute;
        
        let embed = new discord.RichEmbed()
            .setTitle("**__Tempmute__**")
            .setColor("0xd515d5")
            .addField("**" + targetUser.user.username + "**", "Tempmuted by " + "***" + message.author.username + "***" + " for " + time + " hour(s).", false)
            .setThumbnail(targetUser.user.avatarURL)
            .setFooter(message.author.username, message.author.avatarURL)
            .setTimestamp(Date());
        
        if(!message.member.hasPermission('MANAGE_MESSAGES'))
        {
          message.channel.send("You don't have permission to use that command!");
          return;
        }
        
        message.guild.member(targetUser).addRole(targetUser.guild.roles.find(role => role.name === muteRole))
            .then(console.log)
            .catch(console.error);

        let muteTime = time * 3600000;

        setTimeout(() => {
            targetUser.removeRole(targetUser.guild.roles.find(role => role.name === muteRole));

            let embed = new discord.RichEmbed()
                .setTitle("**__Tempmute__**")
                .setColor("0xd515d5")
                .addField("**" + targetUser.user.username + "**", "Tempmute time up.", false)
                .setTimestamp(Date());
            
            staffLog.send(embed);
        }, muteTime);

        let staffLog = message.member.guild.channels.find(channel => channel.name === botConfig["channels"].staff_log);

        staffLog.send(embed);
    }
}

module.exports = TempmuteCommand;