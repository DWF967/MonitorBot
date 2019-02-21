const commando = require('discord.js-commando');
const discord = require('discord.js');
const path = require('path')

const botConfig = require('../../botConfig.json');

class BanCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'tempban',
            group: 'admin',
            memberName: 'tempban',
            description: 'Temporarily bans a user from the guild.'
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
            message.channel.send(time + " is NaN. Please say the number of days you want to ban that person.");
            return;
        }
        
        let embed = new discord.RichEmbed()
            .setTitle("**__Tempban__**")
            .setColor("0x04f896")
            .addField("**" + targetUser.user.username + "**", "Temporarily from the server by " + "***" + message.author.username + "***" + " for " + time + " day(s).", false)
            .setThumbnail(targetUser.user.avatarURL)
            .setFooter(message.author.username, message.author.avatarURL)
            .setTimestamp(Date());

        if(!message.member.hasPermission('MANAGE_MESSAGES'))
        {
          message.channel.send("You don't have permission to use that command!");
          return;
        }
        
        message.guild.member(targetUser).ban()
            .then(console.log)
            .catch(console.error);

        let banTime = time * 86400000;

        setTimeout(() => {
            message.guild.unban(targetUser.id)
    
            let embed = new discord.RichEmbed()
                .setTitle("**__Unban__**")
                .setColor("0xd515d5")
                .addField("**" + targetUser.user.username + "**", "Has been unbanned because his time is up.", false)
                .setTimestamp(Date());
                
            staffLog.send(embed);
        }, banTime);

        let staffLog = message.member.guild.channels.find(channel => channel.name === botConfig["channels"].staff_log);

        staffLog.send(embed);
    }
}

module.exports = BanCommand;