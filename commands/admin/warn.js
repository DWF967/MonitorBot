const commando = require('discord.js-commando');
const discord = require('discord.js');
const path = require('path');
const fs = require('fs');

const reports = require('../../reports.json');
const botConfig = require('../../botConfig.json');

class WarnCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'warn',
            group: 'admin',
            memberName: 'warn',
            description: 'Warns a user in the guild for an offense.'
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

        let id = targetUser.id;

        let embed = new discord.RichEmbed()
            .setTitle("**__Warning__**")
            .setColor("0xffa500")
            .addField("**" + targetUser.user.username + "**", "Warned by " + message.author.username + " for " + reason + ".", false)
            .setThumbnail(targetUser.user.avatarURL)
            .setFooter(message.author.username, message.author.avatarURL)
            .setTimestamp(Date());

        if(!message.member.hasPermission('MANAGE_MESSAGES'))
        {
          message.channel.send("You don't have permission to use that command!");
          return;
        }
        if(reason == "")
        {
            message.channel.send("Please provide a reason for the warning.")
            return;
        }

        if(!reports[id])
        {
            reports[id] = {
                warnings: 1,
                warning_reasons: [reason],
                reports: 0,
                report_reasons: []
            }
        }
        else
        {
            reports[id].warnings = reports[id].warnings + 1;
            reports[id].warning_reasons.push(reason);
        }
        
        globalFunctions.stringifyFile('reports.json', reports, false, "Done!", true);

        let staffLog = message.member.guild.channels.find(channel => channel.name === botConfig["channels"].staff_log);

        staffLog.send(embed);
        targetUser.send(targetUser + ", you have been warned for " + "**\"" +  reason + "\"**" + " in the guild " + "**\"" + targetUser.guild.name + "\"**" + ". Please refrain from doing that.")
    }
}

module.exports = WarnCommand;