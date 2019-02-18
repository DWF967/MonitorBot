const commando = require('discord.js-commando');
const path = require('path');
const fs = require('fs');

const reports = require('../../reports.json');
const botConfig = require('../../botConfig.json');

class ReportCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'report',
            group: 'simple',
            memberName: 'report',
            description: 'Reports a user in the guild for an offense.'
        })
    }

    async run(message, args)
    {
        let targetUser = message.guild.member(message.mentions.users.first());

        let words = args.split(' ');
        let reason = words.slice(1).join(' ');

        let id = targetUser.id;

        if(!targetUser)
        {
            message.channel.send("Sorry, I couldn't find that user.");
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
                warnings: 0,
                warning_reasons: [],
                reports: 1,
                report_reasons: [reason]
            }
        }
        else
        {
            reports[id].reports = reports[id].reports + 1;
            reports[id].report_reasons.push(reason);
        }
        
        globalFunctions.stringifyFile('reports.json', reports, false, "Done!", true);

        let staffLog = message.member.guild.channels.find(channel => channel.name === botConfig["channels"].staff_log);

        staffLog.send(targetUser + " has been warned for " + reason);
    }
}

module.exports = ReportCommand;