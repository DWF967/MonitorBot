const commando = require('discord.js-commando');
const discord = require('discord.js');

class PvTCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'pvt',
            group: 'pvt',
            memberName: 'pvt',
            description: 'Displays the current sub count of PewDiePie and T-Series and the current sub-gap.'
        })
    }

    async run(message, args)
    {
        let pdpSubs = globalFunctions.getChannelData('PewDiePie');
        let tsSubs = globalFunctions.getChannelData('tseries');

        let subGap = pdpSubs - tsSubs;

        let embed = new discord.RichEmbed()
            .setTitle("__**PewDiePie** *vs.* **T-Series**__")
            .setColor("0xf70f2b")
            .addField("**PewDiePie's Subscribers:**", pdpSubs.toLocaleString('en'), true)
            .addField("**T-Series' Subscribers:**", tsSubs.toLocaleString('en'), true)
            .addField("**The subgap is:**", subGap.toLocaleString('en'), false)
            .setFooter("This cmd takes a while to get the live count. | Doc", bot.user.avatarURL)
            .setTimestamp(Date());

        message.channel.send(embed);
    }
}

module.exports = PvTCommand;